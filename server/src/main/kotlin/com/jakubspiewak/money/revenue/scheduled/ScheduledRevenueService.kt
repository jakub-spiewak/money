package com.jakubspiewak.money.revenue.scheduled

import com.jakubspiewak.money.person.PersonService
import com.jakubspiewak.money.revenue.scheduled.type.ScheduledRevenueRequest
import com.jakubspiewak.money.revenue.scheduled.type.ScheduledRevenueResponse
import org.bson.types.ObjectId
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class ScheduledRevenueService(
    private val repository: ScheduledRevenueRepository,
    private val personService: PersonService,
    private val mapper: ScheduledRevenueMapper
) {

    fun readAll(): Flux<ScheduledRevenueResponse> {
        return repository.findAll()
            .flatMap { revenue ->
                personService.readById(revenue.person).map { mapper.fromDocumentToResponse(revenue, it) }
            }.sort { o1, o2 -> o2.amount.compareTo(o1.amount) }
    }

    fun create(request: ScheduledRevenueRequest): Mono<Unit> =
        personService.readById(ObjectId(request.person)).flatMap {
            repository.save(mapper.fromRequestToDocument(request))
        }.map { }

    fun update(id: String, request: ScheduledRevenueRequest): Mono<Unit> =
        personService.readById(ObjectId(request.person)).flatMap {
            repository.save(mapper.fromRequestToDocument(request, ObjectId(id)))
        }.map { }

    fun delete(id: String): Mono<Unit> = repository.deleteById(ObjectId(id)).map { }
}