package com.jakubspiewak.money.common.types

import io.swagger.v3.oas.annotations.media.Schema
import java.math.BigDecimal

@Schema(enumAsRef = true)
enum class AmountType {
    RANGE, CONSTANT, PERCENTAGE, UNKNOWN
}

data class AmountData(
        val value: BigDecimal? = null,
        val min: BigDecimal? = null,
        val max: BigDecimal? = null,
        val percentage: BigDecimal? = null,
)

@Schema(enumAsRef = true)
data class Amount(
        val type: AmountType,
        val data: AmountData
)