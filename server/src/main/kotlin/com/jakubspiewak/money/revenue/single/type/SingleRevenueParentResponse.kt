package com.jakubspiewak.money.revenue.single.type

import com.jakubspiewak.money.common.types.Amount
import io.swagger.v3.oas.annotations.media.Schema

@Schema(requiredProperties = ["name", "amount", "name"])
data class SingleRevenueParentResponse(
        val id: String,
        val name: String,
        val amount: Amount,
)
