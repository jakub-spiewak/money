package com.jakubspiewak.money.tag.type

import io.swagger.v3.oas.annotations.media.Schema

@Schema(requiredProperties = ["id", "name"])
data class TagResponse(val id: String, val name: String)
