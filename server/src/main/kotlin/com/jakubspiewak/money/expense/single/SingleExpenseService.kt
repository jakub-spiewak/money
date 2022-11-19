package com.jakubspiewak.money.expense.single

import com.jakubspiewak.money.expense.scheduled.ScheduledExpenseRepository
import com.jakubspiewak.money.expense.single.type.SingleExpenseRequest
import com.jakubspiewak.money.expense.single.type.SingleExpenseResponse
import com.jakubspiewak.money.tag.TagService
import org.bson.types.ObjectId
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.time.YearMonth
import java.util.*
import kotlin.jvm.optionals.getOrNull

@Service
class SingleExpenseService(
    private val repository: SingleExpenseRepository,
    private val scheduledExpenseRepository: ScheduledExpenseRepository,
    private val tagService: TagService,
    private val mapper: SingleExpenseMapper
) {

    fun readAll(month: YearMonth?): Flux<SingleExpenseResponse> =
        (month?.let { repository.findAllIntersects(month.atDay(1), month.atEndOfMonth()) }
            ?: repository.findAll())
            .flatMap { createResponse(it) }
            .sort { o1, o2 -> o2.amount.compareTo(o1.amount) }

    fun readAllByParent(parentId: ObjectId, month: YearMonth = YearMonth.now()) = repository
        .findAllByParentExpenseIntersects(parentId, month.atDay(1), month.atEndOfMonth())
        .flatMap { createResponse(it) }
        .sort { o1, o2 -> o2.amount.compareTo(o1.amount) }

    fun create(request: SingleExpenseRequest): Mono<Unit> =
        repository.save(mapper.fromRequestToDocument(request)).map { }

    fun update(id: String, request: SingleExpenseRequest): Mono<Unit> = repository.save(
        mapper.fromRequestToDocument(request, ObjectId(id))
    ).map { }

    fun delete(id: String): Mono<Unit> = repository.deleteById(ObjectId(id)).map { }

    @OptIn(ExperimentalStdlibApi::class)
    private fun createResponse(document: SingleExpenseDocument): Mono<SingleExpenseResponse> {

        val tagsMono = tagService.readAllById(document.tags).collectList()

        val parentExpenseMono = document.parentExpense
            ?.let { scheduledExpenseRepository.findById(it) }
            ?.map { mapper.fromParentExpenseToResponse(it) }
            ?.map { Optional.of(it) }
            ?: Mono.just(Optional.empty())

        return Mono.zip(tagsMono, parentExpenseMono).map {
            mapper.fromDocumentToResponse(
                source = document, tags = it.t1, parentExpense = it.t2.getOrNull()
            )
        }

    }

}