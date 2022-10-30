package com.jakubspiewak.money.expense.scheduled

import com.jakubspiewak.money.common.types.avg
import com.jakubspiewak.money.common.types.maximum
import com.jakubspiewak.money.expense.scheduled.type.ScheduledExpenseRequest
import com.jakubspiewak.money.expense.scheduled.type.ScheduledExpenseResponse
import com.jakubspiewak.money.expense.single.SingleExpenseService
import com.jakubspiewak.money.tag.TagService
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
    fun readAll(): Flux<ScheduledExpenseResponse> = repository.findAll().flatMap { createResponse(it) }
        .sort { o1, o2 -> o2.amount.avg().compareTo(o1.amount.avg()) }

    fun readAll(month: YearMonth): Flux<ScheduledExpenseResponse> =
        repository.findAllIntersects(month.atDay(1), month.atEndOfMonth()).flatMap { createResponse(it) }
            .sort { o1, o2 -> o2.amount.avg().compareTo(o1.amount.avg()) }

    fun readById(id: ObjectId): Mono<ScheduledExpenseResponse> = repository.findById(id).flatMap { createResponse(it) }

    fun create(request: ScheduledExpenseRequest): Mono<Unit> =
        repository.save(mapper.fromRequestToDocument(request)).map { }

    fun update(id: String, request: ScheduledExpenseRequest): Mono<Unit> {
        return repository.save(mapper.fromRequestToDocument(request, ObjectId(id))).map { }
    }

    fun delete(id: String): Mono<Unit> = repository.deleteById(ObjectId(id)).map { }

    private fun createResponse(document: ScheduledExpenseDocument): Mono<ScheduledExpenseResponse> {
        val tagsMono = tagService.readAllById(document.tags).collectList()
        val childExpensesMono = document.id?.let { singleExpenseService.readAllByParent(it).collectList() }
            ?: Mono.error { throw RuntimeException() }

        return Mono.zip(tagsMono, childExpensesMono).map { data ->
            val spentPercentage = data.t2.sumOf { it.amount }
                .divide(document.amount.maximum(), HALF_UP)
                .multiply(BigDecimal(100))

            return@map mapper.fromDocumentToResponse(document, tags = data.t1, spentPercentage = spentPercentage)
        }
    }

}