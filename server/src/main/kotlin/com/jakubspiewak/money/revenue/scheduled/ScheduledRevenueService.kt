package com.jakubspiewak.money.revenue.scheduled

import com.jakubspiewak.money.common.types.avg
import com.jakubspiewak.money.revenue.scheduled.type.ScheduledRevenueRequest
import com.jakubspiewak.money.revenue.scheduled.type.ScheduledRevenueResponse
import org.bson.types.ObjectId
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.time.YearMonth

@Service
class ScheduledRevenueService(
    private val repository: ScheduledRevenueRepository, private val mapper: ScheduledRevenueMapper
) {

    fun create(request: ScheduledRevenueRequest): Mono<Unit> =
        repository.save(mapper.fromRequestToDocument(request)).map { }

    fun readById(id: ObjectId) = repository.findById(id).map { mapper.fromDocumentToResponse(it) }

    fun readAll(month: YearMonth? = null): Flux<ScheduledRevenueResponse> =
        (month?.let { repository.findAllIntersects(month.atDay(1), month.atEndOfMonth()) }
            ?: repository.findAll())
            .map { mapper.fromDocumentToResponse(it) }
            .sort { o1, o2 -> o2.amount.avg().compareTo(o1.amount.avg()) }

    fun update(id: String, request: ScheduledRevenueRequest): Mono<Unit> =
        repository.save(mapper.fromRequestToDocument(request, ObjectId(id))).map { }

    fun delete(id: String): Mono<Unit> = repository.deleteById(ObjectId(id)).map { }

}