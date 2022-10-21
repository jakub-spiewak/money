package com.jakubspiewak.money.person

import com.jakubspiewak.money.person.type.PersonRequest
import com.jakubspiewak.money.person.type.PersonResponse
import org.bson.types.ObjectId
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class PersonService(private val repository: PersonRepository, private val mapper: PersonMapper) {

    fun readAll(): Flux<PersonResponse> =
        repository.findAll(Sort.by(Sort.Direction.ASC, "firstName")).map { mapper.documentToResponse(it) }

    fun readById(id: ObjectId): Mono<PersonResponse> = repository.findById(id).map { mapper.documentToResponse(it) }

    fun create(request: PersonRequest): Mono<Unit> = repository.save(mapper.requestToDocument(request)).map { }

    fun update(id: String, request: PersonRequest): Mono<Unit> =
        repository.save(mapper.requestToDocument(request, ObjectId(id))).map { }

    fun delete(id: String): Mono<Unit> = repository.deleteById(ObjectId(id)).map { }
}