package com.jakubspiewak.money.expense.single.type

import com.fasterxml.jackson.annotation.JsonFormat
import java.math.BigDecimal
import java.time.LocalDate

data class SingleExpenseRequest(
        val name: String,
        val amount: BigDecimal,
        val parentExpense: String?,
        @JsonFormat(pattern = "yyyy-MM-dd")
        val date: LocalDate,
        val tags: List<String>
)
