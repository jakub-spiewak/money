package com.jakubspiewak.money.expense.type

import java.math.BigDecimal

data class ExpenseRequest(
    val name: String,
    val amount: BigDecimal,
    val person: String?,
    val tags: List<String>
)
