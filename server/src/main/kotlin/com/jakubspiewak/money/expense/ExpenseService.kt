package com.jakubspiewak.money.expense

import com.jakubspiewak.money.expense.type.ExpenseRequest
import com.jakubspiewak.money.expense.type.ExpenseResponse
import com.jakubspiewak.money.person.PersonDocument
import com.jakubspiewak.money.person.PersonRepository
import com.jakubspiewak.money.person.type.PersonResponse
import com.jakubspiewak.money.tag.TagRepository
import com.jakubspiewak.money.tag.type.TagResponse
import org.bson.types.ObjectId
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class ExpenseService(
    private val repository: ExpenseRepository,
    private val personRepository: PersonRepository,
    private val tagRepository: TagRepository
) {
    fun readAll(): Flux<ExpenseResponse> = repository.findAll().flatMap { expense ->
        return@flatMap Mono.zip(
            expense.person?.let { personRepository.findById(it) } ?: Mono.just(0),
            tagRepository.findAllById(expense.tags).collectList(),
        ) { personDocument, tagsDocuments ->

            val person = if (personDocument is PersonDocument) PersonResponse(
                id = personDocument.id.toString(),
                firstName = personDocument.firstName,
                lastName = personDocument.lastName
            )
            else null

            val tags = tagsDocuments.map { tag ->
                TagResponse(
                    id = tag.id.toString(), name = tag.name
                )
            }

            ExpenseResponse(
                id = expense.id.toString(),
                name = expense.name,
                amount = expense.amount,
                person = person,
                tags = tags
            )
        }
    }

    fun create(request: ExpenseRequest): Mono<Unit> = repository.save(
        ExpenseDocument(name = request.name,
            amount = request.amount,
            person = request.person?.let { ObjectId(it) },
            tags = request.tags.map { ObjectId(it) })
    ).map { }

    fun update(id: String, request: ExpenseRequest): Mono<Unit> = repository.save(
        ExpenseDocument(id = ObjectId(id),
            name = request.name,
            amount = request.amount,
            person = request.person?.let { ObjectId(it) },
            tags = request.tags.map { ObjectId(it) })
    ).map { }

    fun delete(id: String): Mono<Unit> = repository.deleteById(ObjectId(id)).map { }
}