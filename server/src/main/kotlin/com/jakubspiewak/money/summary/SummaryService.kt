package com.jakubspiewak.money.summary

import com.jakubspiewak.money.common.types.maximum
import com.jakubspiewak.money.expense.scheduled.ScheduledExpenseService
import com.jakubspiewak.money.expense.single.SingleExpenseService
import com.jakubspiewak.money.revenue.scheduled.ScheduledRevenueService
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono
import java.math.RoundingMode.HALF_UP
import java.time.YearMonth

@Component
class SummaryService(
    private val scheduledExpenseService: ScheduledExpenseService,
    private val singleExpenseService: SingleExpenseService,
    private val scheduledRevenueService: ScheduledRevenueService,
//    private val singleRevenueService: SingleRevenueService
) {
    fun summary(month: YearMonth): Mono<SummaryResponse> {

        val scheduledExpenseMono = scheduledExpenseService.readAll(month).collectList()
        val scheduledRevenueMono = scheduledRevenueService.readAll(month).collectList()
        val singleExpenseMono = singleExpenseService.readAll(month).collectList()

        return Mono.zip(
            scheduledExpenseMono,
            scheduledRevenueMono,
            singleExpenseMono
        )
            .map { data ->

                val scheduledExpenseList = data.t1
                val scheduledRevenueList = data.t2
                val singleExpenseList = data.t3

                val maximumScheduledExpenses = scheduledExpenseList.sumOf { it.amount.maximum() }.setScale(2, HALF_UP)
                val revenueScheduledMaximumSum = scheduledRevenueList.sumOf { it.amount.maximum().setScale(2, HALF_UP) }
                val currentMonthExpensesSum = singleExpenseList.sumOf { it.amount }.setScale(2, HALF_UP)

                val reamingMaximumAmount = maximumScheduledExpenses.minus(currentMonthExpensesSum)

                val normalizedMaximumReaming = reamingMaximumAmount.divide(maximumScheduledExpenses, HALF_UP)
                val normalizedMaximumSpent = currentMonthExpensesSum.divide(maximumScheduledExpenses, HALF_UP)

                return@map SummaryResponse(
                    budget = maximumScheduledExpenses,
                    reaming = reamingMaximumAmount,
                    spent = currentMonthExpensesSum,
                    normalizedReaming = normalizedMaximumReaming,
                    normalizedSpent = normalizedMaximumSpent,
                    revenue = revenueScheduledMaximumSum
                )
            }
    }
}