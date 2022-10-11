package com.jakubspiewak.money.revenue

import com.jakubspiewak.money.revenue.type.RevenueRequest
import org.springframework.web.bind.annotation.*

@RequestMapping("revenue")
@RestController
class RevenueController(private val service: RevenueService) {
    @PostMapping
    fun createRevenue(@RequestBody request: RevenueRequest) = service.create(request)

    @GetMapping
    fun readRevenue() = service.readAll()

    @PutMapping("/{id}")
    fun updateRevenue(@PathVariable("id") id: String, @RequestBody request: RevenueRequest) = service.update(id, request)

    @DeleteMapping("/{id}")
    fun deleteRevenue(@PathVariable("id") id: String) = service.delete(id)
}