package com.jakubspiewak.money.analyze

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RequestMapping("/analyze")
@RestController
class AnalyzeController(private val analyzeService: AnalyzeService) {

    @GetMapping
    fun analyze() = analyzeService.analyze()
}