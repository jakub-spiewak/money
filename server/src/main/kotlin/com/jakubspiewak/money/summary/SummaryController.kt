package com.jakubspiewak.money.summary

import com.jakubspiewak.money.expense.scheduled.ScheduledExpenseController
import com.jakubspiewak.money.revenue.scheduled.ScheduledRevenueController
import com.jakubspiewak.money.tag.TagController
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.time.YearMonth

@Tag(name = SummaryController.TAG)
@Tag(name = ScheduledExpenseController.TAG)
@Tag(name = ScheduledRevenueController.TAG)
@Tag(name = TagController.TAG)
@RequestMapping("/summary")
@RestController
class SummaryController(private val service: SummaryService) {

    companion object {
        const val TAG = "summary"
    }

    @GetMapping
    fun summary(
        @RequestParam(name = "month", required = false)
        @DateTimeFormat(pattern = "yyyy-MM")
        month: YearMonth?
    ) = service.summary(
        month
            ?: YearMonth.now()
    )

}