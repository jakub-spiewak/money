package com.jakubspiewak.money.expense

import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository

@Repository
interface ExpenseRepository : ReactiveMongoRepository<ExpenseDocument, ObjectId> {
}