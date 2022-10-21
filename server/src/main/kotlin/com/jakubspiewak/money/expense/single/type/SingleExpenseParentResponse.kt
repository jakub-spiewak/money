package com.jakubspiewak.money.expense.single.type

import com.jakubspiewak.money.common.types.Amount

data class SingleExpenseParentResponse(
        val id: String,
        val name: String,
        val amount: Amount,
)
