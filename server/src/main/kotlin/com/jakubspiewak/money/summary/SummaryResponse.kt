package com.jakubspiewak.money.summary

import java.math.BigDecimal

data class SummaryResponse(
    val budget: BigDecimal,
    val reaming: BigDecimal,
    val spent: BigDecimal,
    val normalizedReaming: BigDecimal,
    val normalizedSpent: BigDecimal,
    val revenue: BigDecimal
)
