package com.jakubspiewak.money.revenue.scheduled.type

import com.jakubspiewak.money.common.types.Amount
import com.jakubspiewak.money.common.types.DateRange
import io.swagger.v3.oas.annotations.media.Schema

@Schema(requiredProperties = ["name", "amount", "date"])
data class ScheduledRevenueRequest(
        val name: String,
        val amount: Amount,
        val date: DateRange,
)
