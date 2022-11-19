package com.jakubspiewak.money.expense.scheduled

import com.jakubspiewak.money.common.types.AmountType.CONSTANT
import com.jakubspiewak.money.common.types.avg
import com.jakubspiewak.money.common.types.maximum
import com.jakubspiewak.money.common.types.minimum
import com.jakubspiewak.money.expense.scheduled.type.ScheduledExpenseRequest
import com.jakubspiewak.money.expense.scheduled.type.ScheduledExpenseResponse
import com.jakubspiewak.money.expense.scheduled.type.ScheduledExpenseStatus
import com.jakubspiewak.money.expense.scheduled.type.ScheduledExpenseStatus.*
import com.jakubspiewak.money.expense.single.SingleExpenseService
import com.jakubspiewak.money.tag.TagService
import com.jakubspiewak.money.util.precision2
import org.bson.types.ObjectId
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.math.BigDecimal
import java.math.RoundingMode.HALF_UP
import java.time.YearMonth

@Service
class ScheduledExpenseService(
    private val repository: ScheduledExpenseRepository,
    private val tagService: TagService,
    private val singleExpenseService: SingleExpenseService,
    private val mapper: ScheduledExpenseMapper
) {

    fun readAll(month: YearMonth?): Flux<ScheduledExpenseResponse> =
        (month?.let { repository.findAllIntersects(month.atDay(1), month.atEndOfMonth()) }
            ?: repository.findAll())
            .flatMap {
                createResponse(
                    it,
                    month
                        ?: YearMonth.now()
                )
            }
            .sort { o1, o2 -> o2.amount.avg().compareTo(o1.amount.avg()) }

    fun create(request: ScheduledExpenseRequest): Mono<Unit> =
        repository.save(mapper.fromRequestToDocument(request)).map { }

    fun update(id: String, request: ScheduledExpenseRequest): Mono<Unit> {
        return repository.save(mapper.fromRequestToDocument(request, ObjectId(id))).map { }
    }

    fun delete(id: String): Mono<Unit> = repository.deleteById(ObjectId(id)).map { }

    private fun createResponse(document: ScheduledExpenseDocument, month: YearMonth): Mono<ScheduledExpenseResponse> {
        val tagsMono = tagService.readAllById(document.tags).collectList()
        val childExpensesMono = document.id?.let { singleExpenseService.readAllByParent(it, month).collectList() }
            ?: Mono.error { throw RuntimeException() }

        return Mono.zip(tagsMono, childExpensesMono).map { data ->
            val spentSum = data.t2.sumOf { it.amount }.precision2()
            val spentFactor = spentSum.divide(document.amount.maximum(), HALF_UP)
            val status = createStatus(document, spentSum, month)

            return@map mapper.fromDocumentToResponse(
                document, tags = data.t1, spentFactor = spentFactor, spentSum = spentSum, status = status
            )
        }
    }

    private fun createStatus(
        document: ScheduledExpenseDocument, spent: BigDecimal, month: YearMonth
    ): ScheduledExpenseStatus {
        val amount = document.amount
        val minimum = amount.minimum()
        val maximum = amount.maximum()
        val zero = BigDecimal.ZERO.precision2()

        return when (document.amount.type) {

            CONSTANT -> {
                when (spent.precision2()) {
                    zero -> if (month.isBefore(YearMonth.now())) UNPAID else FUTURE
                    else -> PAID
                }
            }

            else     -> {
                when (spent.precision2()) {
                    zero                -> UNPAID
                    in zero..minimum    -> BELOW_MIN
                    in minimum..maximum -> BETWEEN_MIN_MAX
                    else                -> EXCEED_MAX
                }
            }

        }

    }

}