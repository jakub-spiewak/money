package com.jakubspiewak.money.revenue.type

import com.jakubspiewak.money.person.type.PersonResponse
import java.math.BigDecimal

data class RevenueResponse(
    val id: String,
    val name: String,
    val amount: BigDecimal,
    val person: PersonResponse
)
