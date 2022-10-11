package com.jakubspiewak.money.util

import java.math.BigDecimal
import java.math.RoundingMode.HALF_UP

fun BigDecimal.precision2(): BigDecimal = this.setScale(2, HALF_UP)
fun BigDecimal.precision4(): BigDecimal = this.setScale(4, HALF_UP)

fun BigDecimal.percentage(): BigDecimal = this.times(BigDecimal(100)).precision2()