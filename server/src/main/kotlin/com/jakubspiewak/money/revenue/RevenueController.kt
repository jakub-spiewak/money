package com.jakubspiewak.money.revenue

import com.jakubspiewak.money.person.PersonController
import com.jakubspiewak.money.revenue.type.RevenueRequest
import com.jakubspiewak.money.tag.TagController
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.*

@Tag(name = RevenueController.TAG)
@Tag(name = PersonController.TAG)
@Tag(name = TagController.TAG)
@RequestMapping("revenue")
@RestController
class RevenueController(private val service: RevenueService) {

    companion object {
        const val TAG = "revenue"
    }

    @PostMapping
    fun createRevenue(@RequestBody request: RevenueRequest) = service.create(request)

    @GetMapping
    fun readRevenue() = service.readAll()

    @PutMapping("/{id}")
    fun updateRevenue(@PathVariable("id") id: String, @RequestBody request: RevenueRequest) = service.update(id, request)

    @DeleteMapping("/{id}")
    fun deleteRevenue(@PathVariable("id") id: String) = service.delete(id)
}