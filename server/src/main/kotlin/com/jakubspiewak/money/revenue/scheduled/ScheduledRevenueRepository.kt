package com.jakubspiewak.money.revenue.scheduled

import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository

@Repository
interface ScheduledRevenueRepository : ReactiveMongoRepository<ScheduledRevenueDocument, ObjectId> {
}