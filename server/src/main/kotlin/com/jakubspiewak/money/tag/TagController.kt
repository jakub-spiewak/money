package com.jakubspiewak.money.tag

import com.jakubspiewak.money.tag.type.TagRequest
import org.springframework.web.bind.annotation.*

@RequestMapping("tag")
@RestController
class TagController(private val service: TagService) {
    @PostMapping
    fun createTag(@RequestBody request: TagRequest) = service.create(request)

    @GetMapping
    fun readTag() = service.readAll()

    @PutMapping("/{id}")
    fun updateTag(@PathVariable("id") id: String, @RequestBody request: TagRequest) = service.update(id, request)

    @DeleteMapping("/{id}")
    fun deleteTag(@PathVariable("id") id: String) = service.delete(id)
}