package com.jakubspiewak.money.expense.scheduled

import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository

@Repository
interface ScheduledExpenseRepository : ReactiveMongoRepository<ScheduledExpenseDocument, ObjectId> {}