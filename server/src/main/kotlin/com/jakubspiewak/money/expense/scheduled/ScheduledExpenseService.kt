package com.jakubspiewak.money.expense.scheduled

import com.jakubspiewak.money.expense.scheduled.type.ScheduledExpenseRequest
import com.jakubspiewak.money.expense.scheduled.type.ScheduledExpenseResponse
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
class ScheduledExpenseService(
    private val repository: ScheduledExpenseRepository,
    private val personRepository: PersonRepository,
    private val tagRepository: TagRepository
) {
    fun readAll(): Flux<ScheduledExpenseResponse> = repository.findAll().flatMap { expense ->

        val personMono = expense.person?.let { personRepository.findById(it) }?.map { Optional.of(it) } ?: Mono.just(
            Optional.empty()
        )

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

            ScheduledExpenseResponse(
                id = expense.id.toString(), name = expense.name, amount = expense.amount, person = person, tags = tags
            )
        }
    }.sort { o1, o2 -> o2.amount.compareTo(o1.amount) }

    fun create(request: ScheduledExpenseRequest): Mono<Unit> = repository.save(
        ScheduledExpenseDocument(name = request.name,
            amount = request.amount,
            person = request.person?.let { ObjectId(it) },
            tags = request.tags.map { ObjectId(it) })
    ).map { }

    fun update(id: String, request: ScheduledExpenseRequest): Mono<Unit> = repository.save(
        ScheduledExpenseDocument(id = ObjectId(id),
            name = request.name,
            amount = request.amount,
            person = request.person?.let { ObjectId(it) },
            tags = request.tags.map { ObjectId(it) })
    ).map { }

    fun delete(id: String): Mono<Unit> = repository.deleteById(ObjectId(id)).map { }
}