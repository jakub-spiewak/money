package com.jakubspiewak.money.revenue.scheduled

import com.jakubspiewak.money.revenue.scheduled.ScheduledRevenueDocument.Companion.DATE_FROM_FIELD
import com.jakubspiewak.money.revenue.scheduled.ScheduledRevenueDocument.Companion.DATE_TO_FIELD
import com.jakubspiewak.money.revenue.scheduled.ScheduledRevenueDocument.Companion.NAME_FIELD
import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.Query
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux
import java.time.LocalDate

@Repository
interface ScheduledRevenueRepository : ReactiveMongoRepository<ScheduledRevenueDocument, ObjectId> {

    @Query(
        value = "{ \$or: [" +
                "{ $DATE_FROM_FIELD:  null,         $DATE_TO_FIELD: null }, " +
                "{ $DATE_FROM_FIELD:  null,         $DATE_TO_FIELD: {\$gte: ?0}}, " +
                "{ $DATE_FROM_FIELD: {\$lte: ?1},   $DATE_TO_FIELD: null }, " +
                "{ $DATE_FROM_FIELD: { \$lte: ?1 }, $DATE_TO_FIELD: {\$gte: ?0}} ] " +
                "}",
        sort = "{ $NAME_FIELD: 1 }"
    )
    fun findAllIntersects(from: LocalDate, to: LocalDate): Flux<ScheduledRevenueDocument>

}