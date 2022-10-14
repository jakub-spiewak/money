package com.jakubspiewak.money.expense.scheduled.type

import com.jakubspiewak.money.person.type.PersonResponse
import com.jakubspiewak.money.tag.type.TagResponse
import java.math.BigDecimal

data class ScheduledExpenseResponse(
    val id: String,
    val name: String,
    val amount: BigDecimal,
    val person: PersonResponse?,
    val tags: List<TagResponse>
)
