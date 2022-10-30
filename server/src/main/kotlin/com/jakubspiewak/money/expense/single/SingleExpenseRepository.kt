package com.jakubspiewak.money.expense.single

import com.jakubspiewak.money.expense.single.SingleExpenseDocument.Companion.DATE_FIELD
import com.jakubspiewak.money.expense.single.SingleExpenseDocument.Companion.PARENT_EXPENSE_FIELD
import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.Query
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux
import java.time.LocalDate

@Repository
interface SingleExpenseRepository : ReactiveMongoRepository<SingleExpenseDocument, ObjectId> {

    @Query(
        "{ \$and: [ " +
        "    { $DATE_FIELD: { \$gte: ?0 } }, " +
        "    { $DATE_FIELD: { \$lte: ?1 } }" +
        "] } "
    )
    fun findAllIntersects(from: LocalDate, to: LocalDate): Flux<SingleExpenseDocument>

    @Query(
        "{ \$and: [ " +
        "    { $PARENT_EXPENSE_FIELD: ?0 }, " +
        "    { $DATE_FIELD: { \$gte: ?1 } }, " +
        "    { $DATE_FIELD: { \$lte: ?2 } }" +
        "] } "
    )
    fun findAllByParentExpenseIntersects(
        parentExpense: ObjectId,
        from: LocalDate,
        to: LocalDate
    ): Flux<SingleExpenseDocument>
}