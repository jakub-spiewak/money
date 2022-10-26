package com.jakubspiewak.money.revenue.scheduled.type

import com.jakubspiewak.money.common.types.Amount
import com.jakubspiewak.money.common.types.DateRange

data class ScheduledRevenueRequest(
        val name: String,
        val amount: Amount,
        val date: DateRange,
)
