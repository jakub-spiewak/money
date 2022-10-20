package com.jakubspiewak.money.revenue.scheduled

import com.jakubspiewak.money.person.PersonController
import com.jakubspiewak.money.revenue.scheduled.type.ScheduledRevenueRequest
import com.jakubspiewak.money.tag.TagController
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.*

@Tag(name = ScheduledRevenueController.TAG)
@Tag(name = PersonController.TAG)
@Tag(name = TagController.TAG)
@RequestMapping("revenue/scheduled")
@RestController
class ScheduledRevenueController(private val service: ScheduledRevenueService) {

    companion object {
        const val TAG = "revenue"
    }

    @PostMapping
    fun createScheduledRevenue(@RequestBody request: ScheduledRevenueRequest) = service.create(request)

    @GetMapping
    fun readScheduledRevenue() = service.readAll()

    @PutMapping("/{id}")
    fun updateScheduledRevenue(@PathVariable("id") id: String, @RequestBody request: ScheduledRevenueRequest) = service.update(id, request)

    @DeleteMapping("/{id}")
    fun deleteScheduledRevenue(@PathVariable("id") id: String) = service.delete(id)
}