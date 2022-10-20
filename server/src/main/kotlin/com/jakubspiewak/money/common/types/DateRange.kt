package com.jakubspiewak.money.common.types

import com.fasterxml.jackson.annotation.JsonFormat
import java.time.LocalDate

data class DateRange(
        @JsonFormat(pattern = "yyyy-MM-dd")
        val from: LocalDate?,
        @JsonFormat(pattern = "yyyy-MM-dd")
        val to: LocalDate?
)
