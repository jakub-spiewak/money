package com.jakubspiewak.money.expense.scheduled.type

import com.jakubspiewak.money.common.types.Amount
import com.jakubspiewak.money.common.types.DateRange
import com.jakubspiewak.money.person.type.PersonResponse
import com.jakubspiewak.money.tag.type.TagResponse

data class ScheduledExpenseResponse(
        val id: String,
        val name: String,
        val amount: Amount,
        val date: DateRange,
        val person: PersonResponse?,
        val tags: List<TagResponse>
)
