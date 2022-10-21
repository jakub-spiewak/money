package com.jakubspiewak.money.common.mappper

import com.jakubspiewak.money.common.mappper.resolver.DocumentMapperResolver
import org.mapstruct.MapperConfig
import org.mapstruct.MappingConstants

@MapperConfig(
    componentModel = MappingConstants.ComponentModel.SPRING,
    uses = [DocumentMapperResolver::class]
)
abstract class CommonMapperConfig {
}