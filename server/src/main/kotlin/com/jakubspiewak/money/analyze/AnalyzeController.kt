package com.jakubspiewak.money.analyze

import com.jakubspiewak.money.expense.scheduled.ScheduledExpenseController
import com.jakubspiewak.money.revenue.scheduled.ScheduledRevenueController
import com.jakubspiewak.money.tag.TagController
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.time.YearMonth

@Tag(name = AnalyzeController.TAG)
@Tag(name = TagController.TAG)
@RequestMapping("/analyze")
@RestController
class AnalyzeController(private val analyzeService: AnalyzeService) {

    companion object {
        const val TAG = "analyze"
    }

    @Tag(name = ScheduledExpenseController.TAG)
    @Tag(name = ScheduledRevenueController.TAG)
    @GetMapping
    fun analyzeScheduled(
        @RequestParam("month", required = false)
        month: YearMonth?
    ) = if (month?.isAfter(YearMonth.now()) == true) {
        analyzeService.analyzeScheduled(month)
    } else {
        analyzeService.analyzeSingle(month)
    }
}