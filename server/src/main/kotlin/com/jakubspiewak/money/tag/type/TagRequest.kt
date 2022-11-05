package com.jakubspiewak.money.tag.type

import io.swagger.v3.oas.annotations.media.Schema

@Schema(requiredProperties = ["name"])
data class TagRequest(val name: String)
