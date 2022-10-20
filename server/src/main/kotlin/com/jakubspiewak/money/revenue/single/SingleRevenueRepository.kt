package com.jakubspiewak.money.revenue.single

import com.jakubspiewak.money.revenue.single.SingleRevenueDocument.Companion.DATE_FIELD
import com.jakubspiewak.money.revenue.single.SingleRevenueDocument.Companion.NAME_FIELD
import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.Query
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux
import java.time.LocalDate

@Repository
interface SingleRevenueRepository : ReactiveMongoRepository<SingleRevenueDocument, ObjectId> {
    @Query(
            "{  \$and: [ { $DATE_FIELD: { \$gte: ?0 } }, { $DATE_FIELD: { \$lte: ?1 } } ] }",
            sort = "{ $NAME_FIELD: 1 }"
    )
    fun findAllByDateIntersects(start: LocalDate, end: LocalDate): Flux<SingleRevenueDocument>
}