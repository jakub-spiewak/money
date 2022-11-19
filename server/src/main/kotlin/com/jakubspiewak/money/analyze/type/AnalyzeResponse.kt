package com.jakubspiewak.money.analyze.type

import io.swagger.v3.oas.annotations.media.Schema
import java.math.BigDecimal

@Schema(requiredProperties = ["name", "amount", "factor"])
data class ExpenseSummaryFromTag(
    val name: String,
    val amount: BigDecimal,
    val factor: BigDecimal
)

@Schema(requiredProperties = ["name", "amount", "expenses", "revenuesFactor", "expensesFactor"])
data class TagSummary(
    val name: String,
    val amount: BigDecimal,
    val expenses: List<ExpenseSummaryFromTag>,
    val revenuesFactor: BigDecimal,
    val expensesFactor: BigDecimal
)


@Schema(
    requiredProperties = ["revenueAmountSum", "expensesAmountSum", "savingAmountSum", "savingFactor", "expensesFactor", "tags"]
)
data class AnalyzeResponse(
    val revenueAmountSum: BigDecimal,
    val expensesAmountSum: BigDecimal,
    val savingAmountSum: BigDecimal,
    val savingFactor: BigDecimal,
    val expensesFactor: BigDecimal,
    val tags: List<TagSummary>
)
