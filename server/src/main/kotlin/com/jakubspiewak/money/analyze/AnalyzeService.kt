package com.jakubspiewak.money.analyze

import com.jakubspiewak.money.analyze.type.AnalyzeResponse
import com.jakubspiewak.money.analyze.type.ExpenseSummaryFromTag
import com.jakubspiewak.money.analyze.type.TagSummary
import com.jakubspiewak.money.common.types.avg
import com.jakubspiewak.money.expense.scheduled.ScheduledExpenseService
import com.jakubspiewak.money.revenue.scheduled.ScheduledRevenueService
import com.jakubspiewak.money.tag.TagService
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono
import java.math.BigDecimal.ZERO

@Service
class AnalyzeService(
    private val revenueService: ScheduledRevenueService,
    private val expenseService: ScheduledExpenseService,
    private val tagService: TagService
) {

    fun analyze(): Mono<AnalyzeResponse> {
        return Mono.zip(
            revenueService.readAll().collectList(),
            expenseService.readAll().collectList(),
            tagService.readAll().collectList()
        ).map { data ->
            val revenueList = data.t1
            val expenseList = data.t2
            val tagList = data.t3

            val revenueAmountSum = revenueList.sumOf { it.amount.avg() }
            val expenseAmountSum = expenseList.sumOf { it.amount.avg() }
            val savingAmountSum = (revenueAmountSum - expenseAmountSum)

            val savingPart = savingAmountSum.div(revenueAmountSum).coerceAtMost(savingAmountSum).coerceAtLeast(ZERO)
            val expensePart = expenseAmountSum.div(revenueAmountSum).coerceAtMost(expenseAmountSum).coerceAtLeast(ZERO)

            val tags = tagList.map { tag ->
                val expensesWithCurrentTag = expenseList.filter { expense -> expense.tags.contains(tag) }
                val currentTagExpenseSum = expensesWithCurrentTag.sumOf { it.amount.avg() }

                val currentTagExpensesSummary = expensesWithCurrentTag.map { tagExpense ->
                    val amount = tagExpense.amount.avg()
                    ExpenseSummaryFromTag(
                        name = tagExpense.name,
                        amount = amount,
                        part = amount.div(currentTagExpenseSum)
                    )
                }.sortedByDescending { it.amount }

                TagSummary(
                    name = tag.name,
                    amount = currentTagExpenseSum,
                    partOfRevenues = currentTagExpenseSum.div(revenueAmountSum),
                    partOfExpenses = currentTagExpenseSum.div(expenseAmountSum),
                    expenses = currentTagExpensesSummary
                )
            }.sortedByDescending { it.amount }

            AnalyzeResponse(
                revenueAmountSum = revenueAmountSum,
                expensesAmountSum = expenseAmountSum,
                savingAmountSum = savingAmountSum,
                savingPart = savingPart,
                expensesPart = expensePart,
                tags = tags
            )
        }
    }

}