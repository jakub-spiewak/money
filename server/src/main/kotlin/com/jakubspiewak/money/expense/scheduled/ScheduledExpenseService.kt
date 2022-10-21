package com.jakubspiewak.money.expense.scheduled

import com.jakubspiewak.money.expense.scheduled.type.ScheduledExpenseRequest
import com.jakubspiewak.money.expense.scheduled.type.ScheduledExpenseResponse
import com.jakubspiewak.money.person.PersonService
import com.jakubspiewak.money.person.type.PersonResponse
import com.jakubspiewak.money.tag.TagService
import org.bson.types.ObjectId
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.time.YearMonth

@Service
class ScheduledExpenseService(
    private val repository: ScheduledExpenseRepository,
    private val personService: PersonService,
    private val tagService: TagService,
    private val mapper: ScheduledExpenseMapper
) {
    fun readAll(): Flux<ScheduledExpenseResponse> = repository.findAll().flatMap { createResponse(it) }

    fun readAll(month: YearMonth): Flux<ScheduledExpenseResponse> = repository.findAllIntersects(
        month.atDay(1),
        month.atEndOfMonth()
    ).flatMap { createResponse(it) }

    fun readById(id: ObjectId): Mono<ScheduledExpenseResponse> = repository.findById(id).flatMap { createResponse(it) }

    fun create(request: ScheduledExpenseRequest): Mono<Unit> =
        repository.save(mapper.fromRequestToDocument(request)).map { }

    fun update(id: String, request: ScheduledExpenseRequest): Mono<Unit> {
        return repository.save(mapper.fromRequestToDocument(request, ObjectId(id))).map { }
    }

    fun delete(id: String): Mono<Unit> = repository.deleteById(ObjectId(id)).map { }

    private fun createResponse(document: ScheduledExpenseDocument): Mono<ScheduledExpenseResponse> {
        val personMono: Mono<PersonResponse> = document.person?.let { personService.readById(it) }
            ?: Mono.empty()
        val tagsMono = tagService.readAllById(document.tags).collectList()

        return Mono.zip(personMono, tagsMono).map { mapper.fromDocumentToResponse(document, it.t1, it.t2) }
    }

}