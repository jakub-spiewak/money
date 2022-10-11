package com.jakubspiewak.money.analyze

import com.jakubspiewak.money.analyze.type.AnalyzeResponse
import com.jakubspiewak.money.analyze.type.ExpenseSummaryFromTag
import com.jakubspiewak.money.analyze.type.TagSummary
import com.jakubspiewak.money.expense.ExpenseService
import com.jakubspiewak.money.revenue.RevenueService
import com.jakubspiewak.money.tag.TagService
import com.jakubspiewak.money.util.toBigDecimal2
import com.jakubspiewak.money.util.toBigDecimalPercentage
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono

@Service
class AnalyzeService(
    private val revenueService: RevenueService,
    private val expenseService: ExpenseService,
    private val tagService: TagService
) {

    fun analyze(): Mono<AnalyzeResponse> {
        return Mono.zip(
            revenueService.readAll().collectList(),
            expenseService.readAll().collectList(),
            tagService.readAll().collectList()
        )
            .map { data ->
                val revenueList = data.t1
                val expenseList = data.t2
                val tagList = data.t3

                val revenueAmountSum = revenueList.sumOf { it.amount.toDouble() }
                val expenseAmountSum = expenseList.sumOf { it.amount.toDouble() }
                val savingAmountSum = (revenueAmountSum - expenseAmountSum)

                val savingPart = savingAmountSum.div(revenueAmountSum)
                val expensePart = expenseAmountSum.div(revenueAmountSum)

                val tags = tagList.map { tag ->
                    val expensesWithCurrentTag = expenseList.filter { expense -> expense.tags.contains(tag) }
                    val currentTagExpenseSum = expensesWithCurrentTag.sumOf { it.amount.toDouble() }

                    val currentTagExpensesSummary = expensesWithCurrentTag.map { tagExpense ->
                        val amount = tagExpense.amount.toDouble()
                        ExpenseSummaryFromTag(
                            name = tagExpense.name,
                            amount = amount.toBigDecimal2(),
                            part = amount.div(currentTagExpenseSum).toBigDecimal2()
                        )
                    }

                    TagSummary(
                        name = tag.name,
                        partOfRevenues = currentTagExpenseSum.div(revenueAmountSum).toBigDecimalPercentage(),
                        partOfExpenses = currentTagExpenseSum.div(expenseAmountSum).toBigDecimalPercentage(),
                        expenses = currentTagExpensesSummary
                    )
                }

                AnalyzeResponse(
                    revenueAmountSum = revenueAmountSum.toBigDecimal2(),
                    expensesAmountSum = expenseAmountSum.toBigDecimal2(),
                    savingAmountSum = savingAmountSum.toBigDecimal2(),
                    savingPart = savingPart.toBigDecimalPercentage(),
                    expensesPart = expensePart.toBigDecimalPercentage(),
                    tags = tags
                )
            }
    }

}