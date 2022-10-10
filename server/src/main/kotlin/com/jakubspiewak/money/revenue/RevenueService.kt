package com.jakubspiewak.money.revenue

import com.jakubspiewak.money.person.PersonDocument
import com.jakubspiewak.money.person.PersonRepository
import com.jakubspiewak.money.person.PersonService
import com.jakubspiewak.money.revenue.type.RevenueRequest
import com.jakubspiewak.money.revenue.type.RevenueResponse
import org.bson.types.ObjectId
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class RevenueService(private val repository: RevenueRepository, private val personRepository: PersonRepository) {

    companion object {
        fun mapFromDocumentToResponse(value: RevenueDocument, personDocument: PersonDocument): RevenueResponse =
            RevenueResponse(
                id = value.id.toString(),
                name = value.name,
                amount = value.amount,
                person = PersonService.mapFromDocumentToResponse(personDocument)
            )
    }

    fun readAll(): Flux<RevenueResponse> = repository.findAll()
        .flatMap { revenue ->
            personRepository.findById(revenue.person)
                .map { person ->
                    mapFromDocumentToResponse(revenue, person)
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