package com.jakubspiewak.money.expense.scheduled.type

import java.math.BigDecimal

data class ScheduledExpenseRequest(
    val name: String,
    val amount: BigDecimal,
    val person: String?,
    val tags: List<String>
)
