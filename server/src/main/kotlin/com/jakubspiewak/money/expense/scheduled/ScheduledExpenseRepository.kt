package com.jakubspiewak.money.expense.scheduled

import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.Query
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux
import java.time.LocalDate
import java.util.*

@Repository
interface ScheduledExpenseRepository : ReactiveMongoRepository<ScheduledExpenseDocument, ObjectId> {
    @Query(
            "{ \$or: [{ date_from: null, date_to: null }, { date_from:  null, date_to: {\$gte: ?0}}, { date_from: { " +
            "\$lte: ?1}, date_to: {\$gte: ?0} }, {date_from: { \$lte: ?1 }, date_to: {\$gte: ?0}} ] }"
    )
    fun findAllIntersects(from: LocalDate, to: LocalDate): Flux<ScheduledExpenseDocument>
}