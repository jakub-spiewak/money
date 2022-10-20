package com.jakubspiewak.money.analyze

import com.jakubspiewak.money.analyze.type.AnalyzeResponse
import com.jakubspiewak.money.analyze.type.ExpenseSummaryFromTag
import com.jakubspiewak.money.analyze.type.TagSummary
import com.jakubspiewak.money.common.types.Amount
import com.jakubspiewak.money.common.types.AmountType.*
import com.jakubspiewak.money.expense.scheduled.ScheduledExpenseService
import com.jakubspiewak.money.revenue.scheduled.ScheduledRevenueService
import com.jakubspiewak.money.tag.TagService
import com.jakubspiewak.money.util.toBigDecimal2
import com.jakubspiewak.money.util.toBigDecimalPercentage
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono
import java.math.BigDecimal
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

            val revenueAmountSum = revenueList.sumOf { it.amount.toDouble() }
            val expenseAmountSum = expenseList.sumOf { getAmountNumberFromExpense(it.amount) }.toDouble()
            val savingAmountSum = (revenueAmountSum - expenseAmountSum)

            val savingPart = savingAmountSum.div(revenueAmountSum).coerceAtMost(savingAmountSum).coerceAtLeast(0.0)
            val expensePart = expenseAmountSum.div(revenueAmountSum).coerceAtMost(expenseAmountSum).coerceAtLeast(0.0)

            val tags = tagList.map { tag ->
                val expensesWithCurrentTag = expenseList.filter { expense -> expense.tags.contains(tag) }
                val currentTagExpenseSum = expensesWithCurrentTag.sumOf { getAmountNumberFromExpense(it.amount) }
                        .toDouble()

                val currentTagExpensesSummary = expensesWithCurrentTag.map { tagExpense ->
                    val amount = tagExpense.amount.data.value?.toDouble()
                                 ?: 0.0
                    ExpenseSummaryFromTag(
                            name = tagExpense.name,
                            amount = amount.toBigDecimal2(),
                            part = amount.div(currentTagExpenseSum).toBigDecimalPercentage()
                    )
                }.sortedByDescending { it.amount }

                TagSummary(
                        name = tag.name,
                        amount = currentTagExpenseSum.toBigDecimal2(),
                        partOfRevenues = currentTagExpenseSum.div(revenueAmountSum).toBigDecimalPercentage(),
                        partOfExpenses = currentTagExpenseSum.div(expenseAmountSum).toBigDecimalPercentage(),
                        expenses = currentTagExpensesSummary
                )
            }.sortedByDescending { it.amount }

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

    private fun getAmountNumberFromExpense(amount: Amount): BigDecimal {
        val type = amount.type
        val data = amount.data
        return when (type) {
            UNKNOWN    -> TODO("Shouldn't happen")
            RANGE      -> data.min?.add(
                    data.max
                    ?: ZERO
            )?.divide(BigDecimal(2))
                          ?: ZERO

            CONSTANT   -> data.value
                          ?: ZERO

            PERCENTAGE -> data.value
                          ?: ZERO
        }
    }

}