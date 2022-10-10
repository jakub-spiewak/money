package com.jakubspiewak.money.revenue

import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository

@Repository
interface RevenueRepository : ReactiveMongoRepository<RevenueDocument, ObjectId> {
}