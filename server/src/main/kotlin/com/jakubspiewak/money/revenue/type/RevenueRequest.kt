package com.jakubspiewak.money.revenue.type

import java.math.BigDecimal

data class RevenueRequest(
        val name: String,
        val amount: BigDecimal,
        val person: String
)
