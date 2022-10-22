package com.jakubspiewak.money.revenue.single

import com.jakubspiewak.money.person.PersonService
import com.jakubspiewak.money.revenue.single.type.SingleRevenueRequest
import com.jakubspiewak.money.revenue.single.type.SingleRevenueResponse
import org.bson.types.ObjectId
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.time.YearMonth

@Service
class SingleRevenueService(
    private val repository: SingleRevenueRepository,
    private val personService: PersonService,
    private val mapper: SingleRevenueMapper
) {

    fun readAll(): Flux<SingleRevenueResponse> = repository.findAll().flatMap { revenue ->
        personService.readById(revenue.person).map { mapper.fromDocumentToResponse(revenue, it) }
    }

    fun readAll(month: YearMonth): Flux<SingleRevenueResponse> = repository.findAllByDateIntersects(
        month.atDay(1), month.atEndOfMonth()
    ).flatMap { revenue ->
        personService.readById(revenue.person).map { mapper.fromDocumentToResponse(revenue, it) }
    }

    fun create(request: SingleRevenueRequest): Mono<Unit> = personService.readById(ObjectId(request.person))
        .flatMap { repository.save(mapper.fromRequestToDocument(request)) }
        .map { }

    fun update(id: String, request: SingleRevenueRequest): Mono<Unit> = personService.readById(ObjectId(request.person))
        .flatMap { repository.save(mapper.fromRequestToDocument(request, ObjectId(id))) }
        .map { }

    fun delete(id: String): Mono<Unit> = repository.deleteById(ObjectId(id)).map { }
}