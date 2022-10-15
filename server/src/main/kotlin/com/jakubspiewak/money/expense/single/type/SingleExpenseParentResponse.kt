package com.jakubspiewak.money.expense.single.type

import java.math.BigDecimal

data class SingleExpenseParentResponse(
        val id: String,
        val name: String,
        val amount: BigDecimal,
)
