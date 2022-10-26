package com.jakubspiewak.money.common.types

import com.jakubspiewak.money.common.types.AmountType.*
import io.swagger.v3.oas.annotations.media.Schema
import java.math.BigDecimal
import java.math.BigDecimal.ZERO

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

fun Amount.avg(): BigDecimal {
    return when (this.type) {
        UNKNOWN    -> ZERO
        RANGE      -> ((this.data.min ?: ZERO) + (this.data.min ?: ZERO)).divide(BigDecimal(2))
        CONSTANT   -> this.data.value ?: ZERO
        PERCENTAGE -> this.data.value ?: ZERO
    }
}