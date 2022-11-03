package com.jakubspiewak.money.summary

import org.springframework.format.annotation.DateTimeFormat
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.time.YearMonth

@RequestMapping("/summary")
@RestController
class SummaryController(private val service: SummaryService) {

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