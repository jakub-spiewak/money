package com.jakubspiewak.money.tag

import com.jakubspiewak.money.tag.type.TagRequest
import com.jakubspiewak.money.tag.type.TagResponse
import org.bson.types.ObjectId
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class TagService(private val repository: TagRepository, private val mapper: TagMapper) {

    fun readAll(): Flux<TagResponse> =
        repository.findAll(Sort.by(Sort.Direction.ASC, "name")).map { mapper.documentToResponse(it) }

    fun readAllById(ids: Iterable<ObjectId>): Flux<TagResponse> =
        repository.findAllById(ids).map { mapper.documentToResponse(it) }

    fun readById(id: ObjectId): Mono<TagResponse> = repository.findById(id).map { mapper.documentToResponse(it) }

    fun create(request: TagRequest): Mono<Unit> = repository.save(mapper.requestToDocument(request)).map { }

    fun update(id: String, request: TagRequest): Mono<Unit> {
        return repository.save(mapper.requestToDocument(request, ObjectId(id))).map { }
    }

    fun delete(id: String): Mono<Unit> = repository.deleteById(ObjectId(id)).map { }
}