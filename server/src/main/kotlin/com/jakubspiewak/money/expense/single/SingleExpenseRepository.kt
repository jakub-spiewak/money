package com.jakubspiewak.money.expense.single

import com.jakubspiewak.money.expense.single.SingleExpenseDocument.Companion.NAME_FIELD
import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.Query
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux

@Repository
interface SingleExpenseRepository : ReactiveMongoRepository<SingleExpenseDocument, ObjectId> {

    @Query(
            "{ \$expr: { \$and: [ { \$eq: [{ \$month: \$date}, ?0] }, { \$eq: [{ \$year: \$date}, ?1] } ] }}",
            sort = "{ $NAME_FIELD: 1 }"
    )
    fun findAllInMonth(date_month: Int, date_year: Int): Flux<SingleExpenseDocument>
}