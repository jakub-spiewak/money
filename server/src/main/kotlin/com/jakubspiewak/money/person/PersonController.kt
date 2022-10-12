package com.jakubspiewak.money.person

import com.jakubspiewak.money.person.type.PersonRequest
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.*

@Tag(name = PersonController.TAG)
@RequestMapping("person")
@RestController
class PersonController(private val service: PersonService) {

    companion object {
        const val TAG = "person"
    }

    @PostMapping
    fun createPerson(@RequestBody request: PersonRequest) = service.create(request)

    @GetMapping
    fun readPerson() = service.readAll()

    @PutMapping("/{id}")
    fun updatePerson(@PathVariable("id") id: String, @RequestBody request: PersonRequest) = service.update(id, request)

    @DeleteMapping("/{id}")
    fun deletePerson(@PathVariable("id") id: String) = service.delete(id)
}