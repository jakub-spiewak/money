package com.jakubspiewak.money.expense.single

import com.jakubspiewak.money.expense.scheduled.ScheduledExpenseService
import com.jakubspiewak.money.expense.single.type.SingleExpenseParentResponse
import com.jakubspiewak.money.expense.single.type.SingleExpenseRequest
import com.jakubspiewak.money.expense.single.type.SingleExpenseResponse
import com.jakubspiewak.money.person.PersonRepository
import com.jakubspiewak.money.person.type.PersonResponse
import com.jakubspiewak.money.tag.TagRepository
import com.jakubspiewak.money.tag.type.TagResponse
import org.bson.types.ObjectId
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.*

@Service
class SingleExpenseService(
        private val repository: SingleExpenseRepository,
        private val personRepository: PersonRepository,
        private val scheduledExpenseService: ScheduledExpenseService,
        private val tagRepository: TagRepository
) {
    fun readAll(): Flux<SingleExpenseResponse> = repository.findAll().flatMap { expense ->

        val expenseMono = expense.parentExpense?.let { scheduledExpenseService.readById(it) }?.map { Optional.of(it) }
                          ?: Mono.just(Optional.empty())

        val personMono = expense.person?.let { personRepository.findById(it) }?.map { Optional.of(it) }
                         ?: Mono.just(Optional.empty())

        val tagsMono = tagRepository.findAllById(expense.tags).collectList()

        Mono.zip(expenseMono, personMono, tagsMono).map { data ->
            val parentExpenseDocument = data.t1
            val personDocument = data.t2
            val tagsDocuments = data.t3

            val parentExpense = parentExpenseDocument.map {
                SingleExpenseParentResponse(
                        id = it.id,
                        name = it.name,
                        amount = it.amount,
                )
            }.orElse(null)

            val person = personDocument.map {
                PersonResponse(id = it.id.toString(), firstName = it.firstName, lastName = it.lastName)
            }.orElse(null)

            val tags = tagsDocuments.map { tag ->
                TagResponse(id = tag.id.toString(), name = tag.name)
            }

            SingleExpenseResponse(
                    id = expense.id.toString(),
                    name = expense.name,
                    amount = expense.amount,
                    person = person,
                    parentExpense = parentExpense,
                    tags = tags,
                    date = expense.date,
            )
        }
    }.sort { o1, o2 -> o2.amount.compareTo(o1.amount) }

    fun create(request: SingleExpenseRequest): Mono<Unit> = repository.save(
            SingleExpenseDocument(name = request.name,
                                  amount = request.amount,
                                  date = request.date,
                                  parentExpense = request.parentExpense?.let { ObjectId(it) },
                                  person = request.person?.let { ObjectId(it) },
                                  tags = request.tags.map { ObjectId(it) })
    ).map { }

    fun update(id: String, request: SingleExpenseRequest): Mono<Unit> = repository.save(
            SingleExpenseDocument(id = ObjectId(id),
                                  name = request.name,
                                  amount = request.amount,
                                  date = request.date,
                                  parentExpense = request.parentExpense?.let { ObjectId(it) },
                                  person = request.person?.let { ObjectId(it) },
                                  tags = request.tags.map { ObjectId(it) })
    ).map { }

    fun delete(id: String): Mono<Unit> = repository.deleteById(ObjectId(id)).map { }
}