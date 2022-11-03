package com.jakubspiewak.money.expense.single.type

import com.fasterxml.jackson.annotation.JsonFormat
import com.jakubspiewak.money.tag.type.TagResponse
import io.swagger.v3.oas.annotations.media.Schema
import java.math.BigDecimal
import java.time.LocalDate

@Schema(requiredProperties = ["id", "name", "amount", "date", "tags"])
data class SingleExpenseResponse(
        val id: String,
        val name: String,
        val amount: BigDecimal,
        val parentExpense: SingleExpenseParentResponse?,
        @JsonFormat(pattern = "yyyy-MM-dd")
        val date: LocalDate,
        val tags: List<TagResponse>
)