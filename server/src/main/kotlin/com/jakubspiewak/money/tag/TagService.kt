package com.jakubspiewak.money.tag

import com.jakubspiewak.money.tag.type.TagRequest
import com.jakubspiewak.money.tag.type.TagResponse
import org.bson.types.ObjectId
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class TagService(private val repository: TagRepository) {
    fun readAll(): Flux<TagResponse> = repository.findAll()
        .map {
            TagResponse(
                id = it.id.toString(),
                name = it.name
            )
        }

    fun create(request: TagRequest): Mono<Unit> = repository.save(
        TagDocument(
            name = request.name,
        )
    ).map { }

    fun update(id: String, request: TagRequest): Mono<Unit> = repository.save(
        TagDocument(
            id = ObjectId(id),
            name = request.name,
        )
    )
        .map { }

    fun delete(id: String): Mono<Unit> = repository.deleteById(ObjectId(id)).map { }
}