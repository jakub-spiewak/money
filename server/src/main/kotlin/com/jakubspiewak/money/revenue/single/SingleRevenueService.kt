package com.jakubspiewak.money.revenue.single

import com.jakubspiewak.money.person.PersonRepository
import com.jakubspiewak.money.person.type.PersonResponse
import com.jakubspiewak.money.revenue.single.type.SingleRevenueRequest
import com.jakubspiewak.money.revenue.single.type.SingleRevenueResponse
import org.bson.types.ObjectId
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.time.YearMonth

@Service
class SingleRevenueService(
    private val repository: SingleRevenueRepository, private val personRepository: PersonRepository
) {

    fun readAll(): Flux<SingleRevenueResponse> = repository.findAll().flatMap { revenue ->
        personRepository.findById(revenue.person).map { person ->
            SingleRevenueResponse(
                id = revenue.id.toString(),
                name = revenue.name,
                amount = revenue.amount,
                date = revenue.date,
                person = PersonResponse(
                    id = person.id.toString(), firstName = person.firstName, lastName = person.lastName
                )
            )
        }
    }.sort { o1, o2 -> o2.amount.compareTo(o1.amount) }

    fun readAll(month: YearMonth): Flux<SingleRevenueResponse> = repository.findAllByDateIntersects(
        month.atDay(1), month.atEndOfMonth()
    ).flatMap { revenue ->
        personRepository.findById(revenue.person).map { person ->
            SingleRevenueResponse(
                id = revenue.id.toString(),
                name = revenue.name,
                amount = revenue.amount,
                date = revenue.date,
                person = PersonResponse(
                    id = person.id.toString(), firstName = person.firstName, lastName = person.lastName
                )
            )
        }
    }.sort { o1, o2 -> o2.amount.compareTo(o1.amount) }

    fun create(request: SingleRevenueRequest): Mono<Unit> =
        personRepository.findById(ObjectId(request.person)).flatMap { person ->
            repository.save(
                SingleRevenueDocument(
                    name = request.name,
                    amount = request.amount,
                    date = request.date,
                    person = person.id
                        ?: return@flatMap Mono.error(Exception("")),
                )
            )
        }.map { }

    fun update(
        id: String, request: SingleRevenueRequest
    ): Mono<Unit> = personRepository.findById(ObjectId(request.person)).flatMap { person ->
        repository.save(
            SingleRevenueDocument(
                id = ObjectId(id),
                name = request.name,
                amount = request.amount,
                person = person.id
                    ?: return@flatMap Mono.error(Exception()),
                date = request.date,
            )
        )
    }.map { }

    fun delete(id: String): Mono<Unit> = repository.deleteById(ObjectId(id)).map { }
}