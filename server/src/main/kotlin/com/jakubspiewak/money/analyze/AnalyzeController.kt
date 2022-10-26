package com.jakubspiewak.money.analyze

import com.jakubspiewak.money.expense.scheduled.ScheduledExpenseController
import com.jakubspiewak.money.revenue.scheduled.ScheduledRevenueController
import com.jakubspiewak.money.tag.TagController
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@Tag(name = AnalyzeController.TAG)
@Tag(name = ScheduledExpenseController.TAG)
@Tag(name = ScheduledRevenueController.TAG)
@Tag(name = TagController.TAG)
@RequestMapping("/analyze")
@RestController
class AnalyzeController(private val analyzeService: AnalyzeService) {

    companion object {
        const val TAG = "analyze"
    }

    @GetMapping
    fun analyze() = analyzeService.analyze()
}