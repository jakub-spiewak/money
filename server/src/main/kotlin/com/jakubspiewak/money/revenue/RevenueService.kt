package com.jakubspiewak.money.revenue

import com.jakubspiewak.money.person.PersonRepository
import com.jakubspiewak.money.person.type.PersonResponse
import com.jakubspiewak.money.revenue.type.RevenueRequest
import com.jakubspiewak.money.revenue.type.RevenueResponse
import org.bson.types.ObjectId
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class RevenueService(private val repository: RevenueRepository, private val personRepository: PersonRepository) {

    fun readAll(): Flux<RevenueResponse> = repository.findAll(Sort.by(Sort.Direction.DESC, "amount"))
        .flatMap { revenue ->
            personRepository.findById(revenue.person)
                .map { person ->
                    RevenueResponse(
                        id = revenue.id.toString(),
                        name = revenue.name,
                        amount = revenue.amount,
                        person = PersonResponse(
                            id = person.id.toString(),
                            firstName = person.firstName,
                            lastName = person.lastName
                        )
                    )
                }
        }

    fun create(request: RevenueRequest): Mono<Unit> =
        personRepository.findById(ObjectId(request.personId))
            .flatMap { person ->
                repository.save(
                    RevenueDocument(
                        name = request.name,
                        amount = request.amount,
                        person = person.id
                    )
                )
            }
            .map { }

    fun update(id: String, request: RevenueRequest): Mono<Unit> =
        personRepository.findById(ObjectId(request.personId))
            .flatMap { person ->
                repository.save(
                    RevenueDocument(
                        id = ObjectId(id),
                        name = request.name,
                        amount = request.amount,
                        person = person.id
                    )
                )
            }
            .map { }

    fun delete(id: String): Mono<Unit> = repository.deleteById(ObjectId(id)).map { }
}