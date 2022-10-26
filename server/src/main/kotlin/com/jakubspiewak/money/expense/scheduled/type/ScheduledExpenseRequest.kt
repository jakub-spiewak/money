package com.jakubspiewak.money.expense.scheduled.type

import com.jakubspiewak.money.common.types.Amount
import com.jakubspiewak.money.common.types.DateRange

data class ScheduledExpenseRequest(
        val name: String,
        val amount: Amount,
        val date: DateRange,
        val tags: List<String>
)
