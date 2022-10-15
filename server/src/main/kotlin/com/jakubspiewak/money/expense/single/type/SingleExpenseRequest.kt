package com.jakubspiewak.money.expense.single.type

import com.fasterxml.jackson.annotation.JsonFormat
import java.math.BigDecimal
import java.util.*

data class SingleExpenseRequest(
        val name: String,
        val amount: BigDecimal,
        val parentExpense: String?,
        val person: String?,
        @JsonFormat(pattern = "yyyy-MM-dd")
        val date: Date,
        val tags: List<String>
)
