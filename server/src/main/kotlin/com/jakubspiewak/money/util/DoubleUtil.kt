package com.jakubspiewak.money.util

import java.math.BigDecimal

fun Double.toBigDecimal(): BigDecimal = BigDecimal(this)
fun Double.toBigDecimal2(): BigDecimal = BigDecimal(this).precision2()
fun Double.percentage(): Double = this.times(100)

fun Double.toBigDecimalPercentage(): BigDecimal = this.percentage().toBigDecimal2()
