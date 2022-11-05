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

@Schema(enumAsRef = true, requiredProperties = ["type", "data"])
data class Amount(
    val type: AmountType,
    val data: AmountData
)

fun Amount.avg(): BigDecimal {
    val (value, min, max) = this.data
    return when (this.type) {
        UNKNOWN    -> ZERO
        RANGE      -> ((min ?: ZERO).add(max ?: ZERO)).divide(BigDecimal(2))
        CONSTANT   -> value ?: ZERO
        PERCENTAGE -> value ?: ZERO
    }
}

fun Amount.getPercentageValue(): BigDecimal {
    val (value, _, _, percentage) = this.data
    if (value == null || percentage == null) return ZERO

    return value.times(percentage.divide(BigDecimal(100)))
}

fun Amount.minimum(): BigDecimal {
    val (value, min, _, percentage) = this.data
    return when (this.type) {
        UNKNOWN    -> ZERO
        RANGE      -> min ?: ZERO
        CONSTANT   -> value ?: ZERO
        PERCENTAGE -> (value ?: ZERO).minus(this.getPercentageValue())
    }
}

fun Amount.maximum(): BigDecimal {
    val (value, _, max) = this.data
    return when (this.type) {
        UNKNOWN    -> ZERO
        RANGE      -> max ?: ZERO
        CONSTANT   -> value ?: ZERO
        PERCENTAGE -> (value ?: ZERO).plus(this.getPercentageValue())
    }
}
