package com.jakubspiewak.money.revenue.scheduled.type

import com.jakubspiewak.money.person.type.PersonResponse
import java.math.BigDecimal

data class ScheduledRevenueResponse(
        val id: String,
        val name: String,
        val amount: BigDecimal,
        val person: PersonResponse
)
