package com.jakubspiewak.money.expense.scheduled.type

import com.jakubspiewak.money.common.types.Amount

data class ScheduledExpenseRequest(
        val name: String,
        val amount: Amount,
        val person: String?,
        val tags: List<String>
)
