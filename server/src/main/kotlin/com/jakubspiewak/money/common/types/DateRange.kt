package com.jakubspiewak.money.common.types

import com.fasterxml.jackson.annotation.JsonFormat
import java.util.*

data class DateRange(
        @JsonFormat(pattern = "yyyy-MM-dd")
        val from: Date?,
        @JsonFormat(pattern = "yyyy-MM-dd")
        val to: Date?
)
