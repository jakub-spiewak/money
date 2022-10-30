package com.jakubspiewak.money.summary

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RequestMapping("/summary")
@RestController
class SummaryController(private val service: SummaryService) {

    @GetMapping
    fun summary() = service.summary()

}