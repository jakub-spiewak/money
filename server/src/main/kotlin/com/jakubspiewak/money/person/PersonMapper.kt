package com.jakubspiewak.money.person

import com.jakubspiewak.money.common.mappper.CommonMapperConfig
import com.jakubspiewak.money.person.type.PersonRequest
import com.jakubspiewak.money.person.type.PersonResponse
import org.bson.types.ObjectId
import org.mapstruct.Mapper

@Mapper(config = CommonMapperConfig::class)
interface PersonMapper {
    fun documentToResponse(source: PersonDocument): PersonResponse
    fun requestToDocument(source: PersonRequest, id: ObjectId? = null): PersonDocument
}