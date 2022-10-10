package com.jakubspiewak.money.person

import org.springframework.web.bind.annotation.*

@RequestMapping("person")
@RestController
class PersonController(private val service: PersonService) {
    @PostMapping
    fun create(@RequestBody request: PersonDocument) = service.create(request)

    @GetMapping
    fun read() = service.readAll()

    @PutMapping("/{id}")
    fun update(@PathVariable("id") id: String, @RequestBody request: PersonDocument) = service.update(id, request)

    @DeleteMapping("/{id}")
    fun delete(@PathVariable("id") id: String) = service.delete(id)
}