package com.jakubspiewak.money.expense.scheduled.type

import com.jakubspiewak.money.common.types.Amount
import com.jakubspiewak.money.common.types.DateRange
import com.jakubspiewak.money.tag.type.TagResponse
import java.math.BigDecimal

data class ScheduledExpenseResponse(
        val id: String,
        val name: String,
        val amount: Amount,
        val date: DateRange,
        val tags: List<TagResponse>,
        val spentPercentage: BigDecimal
)
