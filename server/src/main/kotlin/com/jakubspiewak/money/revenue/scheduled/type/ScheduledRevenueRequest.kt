package com.jakubspiewak.money.revenue.scheduled.type

import java.math.BigDecimal

data class ScheduledRevenueRequest(
        val name: String,
        val amount: BigDecimal,
        val person: String
)
