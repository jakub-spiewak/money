package com.jakubspiewak.money.expense

import com.jakubspiewak.money.expense.type.ExpenseRequest
import org.springframework.web.bind.annotation.*

@RequestMapping("expense")
@RestController
class ExpenseController(private val service: ExpenseService) {
    @PostMapping
    fun createExpense(@RequestBody request: ExpenseRequest) = service.create(request)

    @GetMapping
    fun readExpense() = service.readAll()

    @PutMapping("/{id}")
    fun updateExpense(@PathVariable("id") id: String, @RequestBody request: ExpenseRequest) = service.update(id, request)

    @DeleteMapping("/{id}")
    fun deleteExpense(@PathVariable("id") id: String) = service.delete(id)
}