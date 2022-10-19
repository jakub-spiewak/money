package com.jakubspiewak.money.expense.single

import com.jakubspiewak.money.expense.single.type.SingleExpenseRequest
import com.jakubspiewak.money.person.PersonController
import com.jakubspiewak.money.tag.TagController
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.web.bind.annotation.*
import java.time.YearMonth

@Tag(name = SingleExpenseController.TAG)
@Tag(name = PersonController.TAG)
@Tag(name = TagController.TAG)
@RequestMapping("expense/single")
@RestController
class SingleExpenseController(private val service: SingleExpenseService) {

    companion object {
        const val TAG = "expense"
    }

    @PostMapping
    fun createSingleExpense(
            @RequestBody
            request: SingleExpenseRequest
    ) = service.create(request)

    @GetMapping()
    fun readSingleExpense(
            @RequestParam(name = "month", required = false)
            @DateTimeFormat(pattern = "yyyy-MM")
            month: YearMonth?
    ) = month?.let { service.readAllByDate(it) }
        ?: service.readAll()

    @PutMapping("/{id}")
    fun updateSingleExpense(
            @PathVariable("id")
            id: String,
            @RequestBody
            request: SingleExpenseRequest
    ) = service.update(id, request)

    @DeleteMapping("/{id}")
    fun deleteSingleExpense(
            @PathVariable("id")
            id: String
    ) = service.delete(id)
}