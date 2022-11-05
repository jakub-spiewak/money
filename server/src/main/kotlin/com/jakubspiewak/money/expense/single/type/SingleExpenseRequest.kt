package com.jakubspiewak.money.expense.single.type

import com.fasterxml.jackson.annotation.JsonFormat
import io.swagger.v3.oas.annotations.media.Schema
import java.math.BigDecimal
import java.time.LocalDate

@Schema(requiredProperties = ["name", "amount", "date", "tags"])
data class SingleExpenseRequest(
    val name: String,
    val amount: BigDecimal,
    val parentExpense: String?,
    @JsonFormat(pattern = "yyyy-MM-dd")
    val date: LocalDate,
    val tags: List<String>
)
