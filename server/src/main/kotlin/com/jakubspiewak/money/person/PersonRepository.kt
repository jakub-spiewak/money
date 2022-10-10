package com.jakubspiewak.money.person

import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository

@Repository
interface PersonRepository : ReactiveMongoRepository<PersonDocument, ObjectId> {
}