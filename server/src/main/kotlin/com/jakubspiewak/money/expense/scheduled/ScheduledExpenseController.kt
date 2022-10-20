package com.jakubspiewak.money.expense.scheduled

import com.jakubspiewak.money.expense.scheduled.type.ScheduledExpenseRequest
import com.jakubspiewak.money.person.PersonController
import com.jakubspiewak.money.tag.TagController
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.web.bind.annotation.*
import java.time.YearMonth

@Tag(name = ScheduledExpenseController.TAG)
@Tag(name = PersonController.TAG)
@Tag(name = TagController.TAG)
@RequestMapping("expense/scheduled")
@RestController
class ScheduledExpenseController(private val service: ScheduledExpenseService) {

    companion object {
        const val TAG = "scheduled_expense"
    }

    @PostMapping
    fun createScheduledExpense(@RequestBody request: ScheduledExpenseRequest) = service.create(request)

    @GetMapping
    fun readScheduledExpense(
            @RequestParam(name = "month", required = false)
            @DateTimeFormat(pattern = "yyyy-MM")
            month: YearMonth?
    ) = month?.let { service.readAll(month) } ?: service.readAll()

    @PutMapping("/{id}")
    fun updateScheduledExpense(@PathVariable("id") id: String, @RequestBody request: ScheduledExpenseRequest) = service.update(id, request)

    @DeleteMapping("/{id}")
    fun deleteScheduledExpense(@PathVariable("id") id: String) = service.delete(id)
}