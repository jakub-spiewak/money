package com.jakubspiewak.money.revenue.scheduled.type

import com.jakubspiewak.money.common.types.Amount
import com.jakubspiewak.money.common.types.DateRange
import io.swagger.v3.oas.annotations.media.Schema

@Schema(requiredProperties = ["id", "name", "amount", "date"])
data class ScheduledRevenueResponse(
        val id: String,
        val name: String,
        val amount: Amount,
        val date: DateRange,
)
