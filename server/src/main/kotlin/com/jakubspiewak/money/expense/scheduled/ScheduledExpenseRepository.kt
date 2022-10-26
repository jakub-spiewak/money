package com.jakubspiewak.money.expense.scheduled

import com.jakubspiewak.money.expense.scheduled.ScheduledExpenseDocument.Companion.DATE_FROM_FIELD
import com.jakubspiewak.money.expense.scheduled.ScheduledExpenseDocument.Companion.DATE_TO_FIELD
import com.jakubspiewak.money.expense.scheduled.ScheduledExpenseDocument.Companion.NAME_FIELD
import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.Query
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux
import java.time.LocalDate

@Repository
interface ScheduledExpenseRepository : ReactiveMongoRepository<ScheduledExpenseDocument, ObjectId> {

    @Query(
        value = "{ \$or: [" +
                "{ $DATE_FROM_FIELD: null,             $DATE_TO_FIELD: null }, " +
                "{ $DATE_FROM_FIELD:  null,            $DATE_TO_FIELD: {\$gte: ?0}}, " +
                "{ $DATE_FROM_FIELD: { \$lte: ?1},     $DATE_TO_FIELD: null }, " +
                "{ $DATE_FROM_FIELD: { \$lte: ?1 },    $DATE_TO_FIELD: {\$gte: ?0}} " +
                "] }",
        sort = "{ $NAME_FIELD: 1 }"
    )
    fun findAllIntersects(from: LocalDate, to: LocalDate): Flux<ScheduledExpenseDocument>

}