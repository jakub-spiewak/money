package com.jakubspiewak.money.summary

import io.swagger.v3.oas.annotations.media.Schema
import java.math.BigDecimal

@Schema(requiredProperties = ["budget", "reaming", "spent", "normalizedReaming", "normalizedSpent", "revenue"])
data class SummaryResponse(
    val budget: BigDecimal,
    val reaming: BigDecimal,
    val spent: BigDecimal,
    val normalizedReaming: BigDecimal,
    val normalizedSpent: BigDecimal,
    val revenue: BigDecimal
)
