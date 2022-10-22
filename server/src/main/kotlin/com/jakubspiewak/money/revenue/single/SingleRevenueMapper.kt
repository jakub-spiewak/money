package com.jakubspiewak.money.revenue.single

import com.jakubspiewak.money.common.mappper.CommonMapperConfig
import com.jakubspiewak.money.person.type.PersonResponse
import com.jakubspiewak.money.revenue.single.type.SingleRevenueRequest
import com.jakubspiewak.money.revenue.single.type.SingleRevenueResponse
import org.bson.types.ObjectId
import org.mapstruct.Mapper
import org.mapstruct.Mapping

@Mapper(config = CommonMapperConfig::class)
interface SingleRevenueMapper {
    @Mapping(target = "id", source = "source.id")
    @Mapping(target = "person", source = "person")
    fun fromDocumentToResponse(source: SingleRevenueDocument, person: PersonResponse?): SingleRevenueResponse

    @Mapping(target = "id", source = "id")
    @Mapping(target = "date", source = "source.date")
    fun fromRequestToDocument(source: SingleRevenueRequest, id: ObjectId? = null): SingleRevenueDocument
}