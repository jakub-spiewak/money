package com.jakubspiewak.money.expense

import com.jakubspiewak.money.expense.type.ExpenseRequest
import com.jakubspiewak.money.person.PersonController
import com.jakubspiewak.money.tag.TagController
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.*

@Tag(name = ExpenseController.TAG)
@Tag(name = PersonController.TAG)
@Tag(name = TagController.TAG)
@RequestMapping("expense")
@RestController
class ExpenseController(private val service: ExpenseService) {

    companion object {
        const val TAG = "expense"
    }

    @PostMapping
    fun createExpense(@RequestBody request: ExpenseRequest) = service.create(request)

    @GetMapping
    fun readExpense() = service.readAll()

    @PutMapping("/{id}")
    fun updateExpense(@PathVariable("id") id: String, @RequestBody request: ExpenseRequest) = service.update(id, request)

    @DeleteMapping("/{id}")
    fun deleteExpense(@PathVariable("id") id: String) = service.delete(id)
}