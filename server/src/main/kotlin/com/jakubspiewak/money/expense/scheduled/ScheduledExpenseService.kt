package com.jakubspiewak.money.expense.scheduled

import com.jakubspiewak.money.common.types.DateRange
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
    fun readAll(): Flux<ScheduledExpenseResponse> = repository.findAll().flatMap {
        mapToResponse(it)
    }

    fun readById(id: ObjectId): Mono<ScheduledExpenseResponse> = repository.findById(id).flatMap {
        mapToResponse(it)
    }

    fun create(request: ScheduledExpenseRequest): Mono<Unit> = repository.save(
            ScheduledExpenseDocument(name = request.name,
                                     amount = request.amount,
                                     dateFrom = request.date.from,
                                     dateTo = request.date.to,
                                     person = request.person?.let { ObjectId(it) },
                                     tags = request.tags.map { ObjectId(it) }
            )
    ).map { }

    fun update(id: String, request: ScheduledExpenseRequest): Mono<Unit> {
        return repository.save(
                ScheduledExpenseDocument(
                        id = ObjectId(id),
                        name = request.name,
                        amount = request.amount,
                        person = request.person?.let { ObjectId(it) },
                        tags = request.tags.map { ObjectId(it) },
                        dateFrom = request.date.from,
                        dateTo = request.date.to
                )
        ).map { }
    }

    fun delete(id: String): Mono<Unit> = repository.deleteById(ObjectId(id)).map { }


    private fun mapToResponse(document: ScheduledExpenseDocument): Mono<ScheduledExpenseResponse> {
        val personMono = document.person?.let { personRepository.findById(it) }?.map { Optional.of(it) }
                         ?: Mono.just(Optional.empty())

        val tagsMono = tagRepository.findAllById(document.tags).collectList()

        return Mono.zip(personMono, tagsMono) { personDocument, tagsDocuments ->
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
                    id = document.id.toString(),
                    name = document.name,
                    amount = document.amount,
                    date = DateRange(
                            from = document.dateFrom,
                            to = document.dateTo
                    ),
                    person = person,
                    tags = tags
            )
        }
    }
}