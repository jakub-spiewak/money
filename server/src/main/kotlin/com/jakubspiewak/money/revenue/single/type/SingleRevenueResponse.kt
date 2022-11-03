package com.jakubspiewak.money.revenue.single.type

import com.fasterxml.jackson.annotation.JsonFormat
import io.swagger.v3.oas.annotations.media.Schema
import java.math.BigDecimal
import java.time.LocalDate

@Schema(requiredProperties = ["id", "name", "amount", "date"])
data class SingleRevenueResponse(
        val id: String,
        val name: String,
        val amount: BigDecimal,
        val parentRevenue: SingleRevenueParentResponse?,
        @JsonFormat(pattern = "yyyy-MM-dd")
        val date: LocalDate,
)
