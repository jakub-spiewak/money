package com.jakubspiewak.money.person

import com.jakubspiewak.money.person.type.PersonRequest
import com.jakubspiewak.money.person.type.PersonResponse
import org.bson.types.ObjectId
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class PersonService(private val repository: PersonRepository) {
    companion object {
        fun mapFromDocumentToResponse(value: PersonDocument): PersonResponse =
            PersonResponse(
                id = value.id.toString(),
                firstName = value.firstName,
                lastName = value.lastName
            )
    }

    fun readAll(): Flux<PersonResponse> = repository.findAll(Sort.by(Sort.Direction.ASC, "firstName"))
        .map { mapFromDocumentToResponse(it) }

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