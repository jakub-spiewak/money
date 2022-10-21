package com.jakubspiewak.money.expense.single

import com.jakubspiewak.money.expense.scheduled.ScheduledExpenseService
import com.jakubspiewak.money.expense.single.type.SingleExpenseRequest
import com.jakubspiewak.money.expense.single.type.SingleExpenseResponse
import com.jakubspiewak.money.person.PersonService
import com.jakubspiewak.money.tag.TagService
import org.bson.types.ObjectId
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.time.YearMonth

@Service
class SingleExpenseService(
    private val repository: SingleExpenseRepository,
    private val personService: PersonService,
    private val scheduledExpenseService: ScheduledExpenseService,
    private val tagService: TagService,
    private val mapper: SingleExpenseMapper
) {
    fun readAll(): Flux<SingleExpenseResponse> = repository.findAll().flatMap { createResponse(it) }

    fun readAllByDate(yearMonth: YearMonth) = repository.findAllInMonth(
        yearMonth.monthValue, yearMonth.year
    ).flatMap { createResponse(it) }

    fun create(request: SingleExpenseRequest): Mono<Unit> =
        repository.save(mapper.fromRequestToDocument(request)).map { }

    fun update(id: String, request: SingleExpenseRequest): Mono<Unit> = repository.save(
        mapper.fromRequestToDocument
            (request, ObjectId(id))
    ).map { }

    fun delete(id: String): Mono<Unit> = repository.deleteById(ObjectId(id)).map { }

    fun createResponse(document: SingleExpenseDocument): Mono<SingleExpenseResponse> {
        val tagsMono = tagService.readAllById(document.tags).collectList()

        val parentExpenseMono = document.parentExpense
            ?.let { scheduledExpenseService.readById(it) }
            ?.map { mapper.fromParentExpenseToResponse(it) }
            ?: Mono.empty()

        val personMono = document.person?.let { personService.readById(it) }
            ?: Mono.empty()

        return Mono.zip(tagsMono, parentExpenseMono, personMono).map {
            mapper.fromDocumentToResponse(
                source = document,
                tags = it.t1,
                parentExpense = it.t2,
                person = it.t3
            )
        }
    }
}