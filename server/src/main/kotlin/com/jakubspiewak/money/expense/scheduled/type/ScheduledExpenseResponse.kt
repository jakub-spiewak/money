package com.jakubspiewak.money.expense.scheduled.type

import com.jakubspiewak.money.common.types.Amount
import com.jakubspiewak.money.common.types.DateRange
import com.jakubspiewak.money.tag.type.TagResponse
import io.swagger.v3.oas.annotations.media.Schema
import java.math.BigDecimal

@Schema(requiredProperties = ["id", "name", "amount", "date", "tags", "spentSum", "spentFactor"])
data class ScheduledExpenseResponse(
        val id: String,
        val name: String,
        val amount: Amount,
        val date: DateRange,
        val tags: List<TagResponse>,
        val spentSum: BigDecimal,
        val spentFactor: BigDecimal,
)
