package com.jakubspiewak.money.expense

import com.jakubspiewak.money.expense.type.ExpenseRequest
import com.jakubspiewak.money.expense.type.ExpenseResponse
import com.jakubspiewak.money.person.PersonRepository
import com.jakubspiewak.money.person.type.PersonResponse
import com.jakubspiewak.money.tag.TagRepository
import com.jakubspiewak.money.tag.type.TagResponse
import org.bson.types.ObjectId
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.*

@Service
class ExpenseService(
    private val repository: ExpenseRepository,
    private val personRepository: PersonRepository,
    private val tagRepository: TagRepository
) {
    fun readAll(): Flux<ExpenseResponse> = repository.findAll().flatMap { expense ->

            val personMono = expense.person
                ?.let { personRepository.findById(it) }?.map { Optional.of(it) }
                ?: Mono.just(Optional.empty())

            val tagsMono = tagRepository.findAllById(expense.tags).collectList()

            Mono.zip(personMono, tagsMono) { personDocument, tagsDocuments ->
                val person = personDocument.map {
                    PersonResponse(
                        id = it.id.toString(), firstName = it.firstName, lastName = it.lastName
                    )
                }.orElse(null)

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
        }.sort { o1, o2 -> o2.amount.compareTo(o1.amount) }

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