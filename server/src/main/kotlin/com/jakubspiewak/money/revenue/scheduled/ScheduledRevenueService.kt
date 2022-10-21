package com.jakubspiewak.money.revenue.scheduled

import com.jakubspiewak.money.person.PersonRepository
import com.jakubspiewak.money.person.type.PersonResponse
import com.jakubspiewak.money.revenue.scheduled.type.ScheduledRevenueRequest
import com.jakubspiewak.money.revenue.scheduled.type.ScheduledRevenueResponse
import org.bson.types.ObjectId
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class ScheduledRevenueService(private val repository: ScheduledRevenueRepository, private val personRepository: PersonRepository) {

    fun readAll(): Flux<ScheduledRevenueResponse> =
        repository.findAll().flatMap { revenue ->
            revenue.person?.let {
                personRepository.findById(it).map { person ->
                    ScheduledRevenueResponse(
                        id = revenue.id.toString(),
                        name = revenue.name,
                        amount = revenue.amount,
                        person = PersonResponse(
                            id = person.id.toString(), firstName = person.firstName, lastName = person.lastName
                        )
                    )
                }
            } ?: return@flatMap Flux.error(Exception("WTF XD"))
            }.sort { o1, o2 -> o2.amount.compareTo(o1.amount) }

    fun create(request: ScheduledRevenueRequest): Mono<Unit> =
        personRepository.findById(ObjectId(request.person)).flatMap { person ->
                repository.save(
                    ScheduledRevenueDocument(
                        name = request.name, amount = request.amount, person = person.id
                    )
                )
            }.map { }

    fun update(id: String, request: ScheduledRevenueRequest): Mono<Unit> =
        personRepository.findById(ObjectId(request.person)).flatMap { person ->
                repository.save(
                    ScheduledRevenueDocument(
                        id = ObjectId(id), name = request.name, amount = request.amount, person = person.id
                    )
                )
            }.map { }

    fun delete(id: String): Mono<Unit> = repository.deleteById(ObjectId(id)).map { }
}