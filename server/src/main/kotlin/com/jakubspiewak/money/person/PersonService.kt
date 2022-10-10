package com.jakubspiewak.money.person

import com.jakubspiewak.money.person.type.PersonRequest
import com.jakubspiewak.money.person.type.PersonResponse
import org.bson.types.ObjectId
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class PersonService(private val repository: PersonRepository) {
    fun readAll(): Flux<PersonResponse> = repository.findAll()
        .map {
            PersonResponse(
                id = it.id.toString(),
                firstName = it.firstName,
                lastName = it.lastName
            )
        }

    fun create(request: PersonRequest): Mono<Unit> = repository.save(
        PersonDocument(
            firstName = request.firstName,
            lastName = request.lastName
        )
    ).map { }

    fun update(id: String, request: PersonRequest): Mono<Unit> = repository.save(
        PersonDocument(
            id = ObjectId(id),
            firstName = request.firstName,
            lastName = request.lastName
        )
    )
        .map { }

    fun delete(id: String): Mono<Unit> = repository.deleteById(ObjectId(id)).map { }
}