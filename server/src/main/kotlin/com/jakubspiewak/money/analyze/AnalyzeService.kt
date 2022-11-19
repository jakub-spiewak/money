package com.jakubspiewak.money.analyze

import com.jakubspiewak.money.analyze.type.AnalyzeResponse
import com.jakubspiewak.money.analyze.type.ExpenseSummaryFromTag
import com.jakubspiewak.money.analyze.type.TagSummary
import com.jakubspiewak.money.common.types.avg
import com.jakubspiewak.money.expense.scheduled.ScheduledExpenseService
import com.jakubspiewak.money.expense.single.SingleExpenseService
import com.jakubspiewak.money.revenue.scheduled.ScheduledRevenueService
import com.jakubspiewak.money.revenue.single.SingleRevenueService
import com.jakubspiewak.money.tag.TagService
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono
import java.math.BigDecimal.ZERO
import java.math.RoundingMode.HALF_UP
import java.time.YearMonth

@Service
class AnalyzeService(
    private val singleRevenueService: SingleRevenueService,
    private val singleExpenseService: SingleExpenseService,
    private val scheduledRevenueService: ScheduledRevenueService,
    private val scheduledExpenseService: ScheduledExpenseService,
    private val tagService: TagService
) {

    fun analyzeScheduled(month: YearMonth?): Mono<AnalyzeResponse> {
        return Mono.zip(
            scheduledRevenueService.readAll(month).collectList(),
            scheduledExpenseService.readAll(month).collectList(),
            tagService.readAll().collectList()
        ).map { data ->
            val revenueList = data.t1
            val expenseList = data.t2
            val tagList = data.t3

            val revenueAmountSum = revenueList.sumOf { it.amount.avg() }
            val expenseAmountSum = expenseList.sumOf { it.amount.avg() }
            val savingAmountSum = (revenueAmountSum - expenseAmountSum).coerceAtLeast(ZERO)

            val savingFactor = savingAmountSum.divide(revenueAmountSum, 4, HALF_UP)
            val expenseFactor = expenseAmountSum.divide(revenueAmountSum, 4, HALF_UP)

            val tags = tagList.map { tag ->
                val expensesWithCurrentTag = expenseList.filter { expense -> expense.tags.contains(tag) }
                val currentTagExpenseSum = expensesWithCurrentTag.sumOf { it.amount.avg() }

                val currentTagExpensesSummary = expensesWithCurrentTag.map { tagExpense ->
                    val amount = tagExpense.amount.avg()
                    ExpenseSummaryFromTag(
                        name = tagExpense.name,
                        amount = amount,
                        factor = amount.divide(currentTagExpenseSum, 4, HALF_UP)
                    )
                }.sortedByDescending { it.amount }

                TagSummary(
                    name = tag.name,
                    amount = currentTagExpenseSum,
                    revenuesFactor = currentTagExpenseSum.divide(revenueAmountSum, 4, HALF_UP),
                    expensesFactor = currentTagExpenseSum.divide(expenseAmountSum, 4, HALF_UP),
                    expenses = currentTagExpensesSummary
                )
            }
                .filter { it.amount > ZERO }
                .sortedByDescending { it.amount }

            AnalyzeResponse(
                revenueAmountSum = revenueAmountSum,
                expensesAmountSum = expenseAmountSum,
                savingAmountSum = savingAmountSum,
                savingFactor = savingFactor,
                expensesFactor = expenseFactor,
                tags = tags
            )

        }
    }

    fun analyzeSingle(month: YearMonth?): Mono<AnalyzeResponse> {

        return Mono.zip(
            singleRevenueService.readAll(month).collectList(),
            singleExpenseService.readAll(month).collectList(),
            tagService.readAll().collectList()
        ).map { data ->
            val revenueList = data.t1
            val expenseList = data.t2
            val tagList = data.t3

            val revenueAmountSum = revenueList.sumOf { it.amount }
            val expenseAmountSum = expenseList.sumOf { it.amount }
            val savingAmountSum = (revenueAmountSum - expenseAmountSum).coerceAtLeast(ZERO)

            val savingFactor = savingAmountSum.div(revenueAmountSum)
            val expenseFactor = expenseAmountSum.div(revenueAmountSum)

            val tags = tagList.map { tag ->
                val expensesWithCurrentTag = expenseList.filter { expense -> expense.tags.contains(tag) }
                val currentTagExpenseSum = expensesWithCurrentTag.sumOf { it.amount }

                val currentTagExpensesSummary = expensesWithCurrentTag.map { tagExpense ->
                    val amount = tagExpense.amount
                    ExpenseSummaryFromTag(
                        name = tagExpense.name, amount = amount, factor = amount.div(currentTagExpenseSum)
                    )
                }.sortedByDescending { it.amount }

                TagSummary(
                    name = tag.name,
                    amount = currentTagExpenseSum,
                    revenuesFactor = currentTagExpenseSum.div(revenueAmountSum),
                    expensesFactor = currentTagExpenseSum.div(expenseAmountSum),
                    expenses = currentTagExpensesSummary
                )

            }
                .filter { it.amount > ZERO }
                .sortedByDescending { it.amount }

            AnalyzeResponse(
                revenueAmountSum = revenueAmountSum,
                expensesAmountSum = expenseAmountSum,
                savingAmountSum = savingAmountSum,
                savingFactor = savingFactor,
                expensesFactor = expenseFactor,
                tags = tags
            )
        }

    }

}