package com.jakubspiewak.money.revenue.single

import com.jakubspiewak.money.revenue.scheduled.ScheduledRevenueService
import com.jakubspiewak.money.revenue.single.type.SingleRevenueRequest
import com.jakubspiewak.money.revenue.single.type.SingleRevenueResponse
import org.bson.types.ObjectId
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.time.YearMonth
import java.util.*
import kotlin.jvm.optionals.getOrNull

@Service
class SingleRevenueService(
    private val repository: SingleRevenueRepository,
    private val scheduledRevenueService: ScheduledRevenueService,
    private val mapper: SingleRevenueMapper
) {

    fun create(request: SingleRevenueRequest): Mono<Unit> =
        repository.save(mapper.fromRequestToDocument(request)).map { }

    fun readAll(month: YearMonth? = null): Flux<SingleRevenueResponse> =
        (month?.let { repository.findAllInMonth(month.monthValue, month.year) }
            ?: repository.findAll())
            .flatMap { createResponse(it) }
            .sort { o1, o2 -> o2.amount.compareTo(o1.amount) }

    fun update(id: String, request: SingleRevenueRequest): Mono<Unit> =
        repository.save(mapper.fromRequestToDocument(request, ObjectId(id))).map { }

    fun delete(id: String): Mono<Unit> = repository.deleteById(ObjectId(id)).map { }

    @OptIn(ExperimentalStdlibApi::class)
    private fun createResponse(revenue: SingleRevenueDocument): Mono<SingleRevenueResponse> {
        val parentRevenueMono = revenue.parentRevenue
            ?.let { scheduledRevenueService.readById(it) }
            ?.map { mapper.fromParentRevenueToResponse(it) }
            ?.map { Optional.of(it) }
            ?: Mono.just(Optional.empty())

        return parentRevenueMono.map {
            mapper.fromDocumentToResponse(source = revenue, parentRevenue = it.getOrNull())
        }

    }
}