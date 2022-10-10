package com.jakubspiewak.money.person

import org.bson.types.ObjectId
import org.springframework.stereotype.Service

@Service
class PersonService(private val repository: PersonRepository) {
    fun readAll() = repository.findAll()

    fun create(request: PersonDocument) = repository.save(request)

    fun update(id: String, request: PersonDocument) =
        repository.save(
            PersonDocument(
                id = ObjectId(id),
                firstName = request.firstName,
                lastName = request.lastName
            )
        )

    fun delete(id: String) =
        repository.deleteById(ObjectId(id))
}