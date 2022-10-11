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

@Service
class ExpenseService(
    private val repository: ExpenseRepository,
    private val personRepository: PersonRepository,
    private val tagRepository: TagRepository
) {
    fun readAll(): Flux<ExpenseResponse> = repository.findAll()
        .flatMap { expense ->
            Mono.zip(
                personRepository.findById(expense.person),
                tagRepository.findAllById(expense.tags).collectList(),
            ) { person, tags ->
                ExpenseResponse(
                    id = expense.id.toString(),
                    name = expense.name,
                    amount = expense.amount,
                    person = PersonResponse(
                        id = person.id.toString(),
                        firstName = person.firstName,
                        lastName = person.lastName
                    ),
                    tags = tags.map { tag ->
                        TagResponse(
                            id = tag.id.toString(),
                            name = tag.name
                        )
                    }
                )
            }
        }

    fun create(request: ExpenseRequest): Mono<Unit> = repository.save(
        ExpenseDocument(
            name = request.name,
            amount = request.amount,
            person = ObjectId(request.person),
            tags = request.tags.map { ObjectId(it) }
        )
    ).map { }

    fun update(id: String, request: ExpenseRequest): Mono<Unit> = repository.save(
        ExpenseDocument(
            id = ObjectId(id),
            name = request.name,
            amount = request.amount,
            person = ObjectId(request.person),
            tags = request.tags.map { ObjectId(it) }
        )
    )
        .map { }

    fun delete(id: String): Mono<Unit> = repository.deleteById(ObjectId(id)).map { }
}