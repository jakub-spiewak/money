package com.jakubspiewak.money.expense.scheduled.type

import io.swagger.v3.oas.annotations.media.Schema

@Schema(enumAsRef = true)
enum class ScheduledExpenseStatus {
    FUTURE, PAID, UNPAID, BELOW_MIN, BETWEEN_MIN_MAX, EXCEED_MAX
}