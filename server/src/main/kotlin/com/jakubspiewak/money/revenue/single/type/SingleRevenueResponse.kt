package com.jakubspiewak.money.revenue.single.type

import com.fasterxml.jackson.annotation.JsonFormat
import java.math.BigDecimal
import java.time.LocalDate

data class SingleRevenueResponse(
        val id: String,
        val name: String,
        val amount: BigDecimal,
        val parentRevenue: SingleRevenueParentResponse?,
        @JsonFormat(pattern = "yyyy-MM-dd")
        val date: LocalDate,
)
