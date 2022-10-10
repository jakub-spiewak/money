package com.jakubspiewak.money.tag

import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository

@Repository
interface TagRepository : ReactiveMongoRepository<TagDocument, ObjectId> {
}