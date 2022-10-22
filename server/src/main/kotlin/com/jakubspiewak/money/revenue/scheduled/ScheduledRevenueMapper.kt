package com.jakubspiewak.money.revenue.scheduled

import com.jakubspiewak.money.common.mappper.CommonMapperConfig
import com.jakubspiewak.money.person.type.PersonResponse
import com.jakubspiewak.money.revenue.scheduled.type.ScheduledRevenueRequest
import com.jakubspiewak.money.revenue.scheduled.type.ScheduledRevenueResponse
import org.bson.types.ObjectId
import org.mapstruct.Mapper
import org.mapstruct.Mapping

@Mapper(config = CommonMapperConfig::class)
interface ScheduledRevenueMapper {
    @Mapping(target = "id", source = "source.id")
    @Mapping(target = "person", source = "person")
    fun fromDocumentToResponse(source: ScheduledRevenueDocument, person: PersonResponse?): ScheduledRevenueResponse

    @Mapping(target = "id", source = "id")
    fun fromRequestToDocument(source: ScheduledRevenueRequest, id: ObjectId? = null): ScheduledRevenueDocument
}