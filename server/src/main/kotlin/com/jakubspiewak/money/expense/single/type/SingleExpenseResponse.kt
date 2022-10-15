package com.jakubspiewak.money.expense.single.type

import com.fasterxml.jackson.annotation.JsonFormat
import com.jakubspiewak.money.expense.scheduled.type.ScheduledExpenseResponse
import com.jakubspiewak.money.person.type.PersonResponse
import com.jakubspiewak.money.tag.type.TagResponse
import java.math.BigDecimal
import java.util.*

data class SingleExpenseResponse(
        val id: String,
        val name: String,
        val amount: BigDecimal,
        val parentExpense: ScheduledExpenseResponse?,
        val person: PersonResponse?,
        @JsonFormat(pattern = "yyyy-MM-dd")
        val date: Date,
        val tags: List<TagResponse>
)