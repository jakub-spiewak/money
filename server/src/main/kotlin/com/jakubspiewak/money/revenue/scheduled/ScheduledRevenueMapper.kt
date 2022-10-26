package com.jakubspiewak.money.revenue.scheduled

import com.jakubspiewak.money.common.mappper.CommonMapperConfig
import com.jakubspiewak.money.revenue.scheduled.type.ScheduledRevenueRequest
import com.jakubspiewak.money.revenue.scheduled.type.ScheduledRevenueResponse
import org.bson.types.ObjectId
import org.mapstruct.Mapper
import org.mapstruct.Mapping

@Mapper(config = CommonMapperConfig::class)
interface ScheduledRevenueMapper {
    @Mapping(target = "id", source = "source.id")
    @Mapping(target = "date.to", source = "source.dateTo")
    @Mapping(target = "date.from", source = "source.dateFrom")
    fun fromDocumentToResponse(source: ScheduledRevenueDocument): ScheduledRevenueResponse

    @Mapping(target = "id", source = "id")
    @Mapping(target = "dateFrom", source = "source.date.from")
    @Mapping(target = "dateTo", source = "source.date.to")
    fun fromRequestToDocument(source: ScheduledRevenueRequest, id: ObjectId? = null): ScheduledRevenueDocument

}