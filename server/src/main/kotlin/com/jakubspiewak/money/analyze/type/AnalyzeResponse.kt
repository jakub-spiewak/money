package com.jakubspiewak.money.analyze.type

import java.math.BigDecimal

data class ExpenseSummaryFromTag(
    val name: String,
    val amount: BigDecimal,
    val part: BigDecimal
)

data class TagSummary(
    val name: String,
    val expenses: List<ExpenseSummaryFromTag>,
    val partOfRevenues: BigDecimal,
    val partOfExpenses: BigDecimal
)

data class AnalyzeResponse(
    val revenueAmountSum: BigDecimal,
    val expensesAmountSum: BigDecimal,
    val savingAmountSum: BigDecimal,
    val savingPart: BigDecimal,
    val expensesPart: BigDecimal,
    val tags: List<TagSummary>
)
