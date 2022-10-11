package com.jakubspiewak.money.expense.type

import com.jakubspiewak.money.person.type.PersonResponse
import com.jakubspiewak.money.tag.type.TagResponse
import java.math.BigDecimal

data class ExpenseResponse(
    val id: String,
    val name: String,
    val amount: BigDecimal,
    val person: PersonResponse,
    val tags: List<TagResponse>
)
