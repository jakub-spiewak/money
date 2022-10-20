package com.jakubspiewak.money.revenue.single

import com.jakubspiewak.money.person.PersonController
import com.jakubspiewak.money.revenue.single.type.SingleRevenueRequest
import com.jakubspiewak.money.revenue.single.type.SingleRevenueResponse
import com.jakubspiewak.money.tag.TagController
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import java.time.YearMonth

@Tag(name = SingleRevenueController.TAG)
@Tag(name = PersonController.TAG)
@Tag(name = TagController.TAG)
@RequestMapping("revenue/single")
@RestController
class SingleRevenueController(private val service: SingleRevenueService) {

    companion object {
        const val TAG = "revenue"
    }

    @PostMapping
    fun createSingleRevenue(
            @RequestBody
            request: SingleRevenueRequest
    ) = service.create(request)

    @GetMapping
    fun readSingleRevenue(
            @RequestParam("month", required = false)
            month: YearMonth?
    ): Flux<SingleRevenueResponse> {
        return month?.let { service.readAll(it) }
               ?: service.readAll()
    }

    @PutMapping("/{id}")
    fun updateSingleRevenue(
            @PathVariable("id")
            id: String,
            @RequestBody
            request: SingleRevenueRequest
    ) = service.update(id, request)

    @DeleteMapping("/{id}")
    fun deleteSingleRevenue(
            @PathVariable("id")
            id: String
    ) = service.delete(id)
}