package com.jakubspiewak.money.expense.single

import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository

@Repository
interface SingleExpenseRepository : ReactiveMongoRepository<SingleExpenseDocument, ObjectId> {}