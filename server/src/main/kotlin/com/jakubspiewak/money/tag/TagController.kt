package com.jakubspiewak.money.tag

import com.jakubspiewak.money.tag.type.TagRequest
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.*

@Tag(name = TagController.TAG)
@RequestMapping("tag")
@RestController
class TagController(private val service: TagService) {
    companion object {
        const val TAG = "tag"
    }

    @PostMapping
    fun createTag(@RequestBody request: TagRequest) = service.create(request)

    @GetMapping
    fun readTag() = service.readAll()

    @PutMapping("/{id}")
    fun updateTag(@PathVariable("id") id: String, @RequestBody request: TagRequest) = service.update(id, request)

    @DeleteMapping("/{id}")
    fun deleteTag(@PathVariable("id") id: String) = service.delete(id)
}