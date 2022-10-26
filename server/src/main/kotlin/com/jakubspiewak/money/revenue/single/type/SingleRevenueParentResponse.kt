package com.jakubspiewak.money.revenue.single.type

import com.jakubspiewak.money.common.types.Amount

data class SingleRevenueParentResponse(
        val id: String,
        val name: String,
        val amount: Amount,
)
