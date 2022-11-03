package com.jakubspiewak.money.expense.single.type

import com.jakubspiewak.money.common.types.Amount
import io.swagger.v3.oas.annotations.media.Schema

@Schema(requiredProperties = ["id", "name", "amount"])
data class SingleExpenseParentResponse(
    val id: String,
    val name: String,
    val amount: Amount,
)
