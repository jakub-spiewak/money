package com.jakubspiewak.money.revenue.single

import com.jakubspiewak.money.common.mappper.CommonMapperConfig
import com.jakubspiewak.money.revenue.scheduled.type.ScheduledRevenueResponse
import com.jakubspiewak.money.revenue.single.type.SingleRevenueParentResponse
import com.jakubspiewak.money.revenue.single.type.SingleRevenueRequest
import com.jakubspiewak.money.revenue.single.type.SingleRevenueResponse
import org.bson.types.ObjectId
import org.mapstruct.Mapper
import org.mapstruct.Mapping

@Mapper(config = CommonMapperConfig::class)
interface SingleRevenueMapper {

    @Mapping(target = "parentRevenue", source = "parentRevenue")
    @Mapping(target = "name", source = "source.name")
    @Mapping(target = "amount", source = "source.amount")
    @Mapping(target = "id", source = "source.id")
    fun fromDocumentToResponse(
        source: SingleRevenueDocument,
        parentRevenue: SingleRevenueParentResponse? = null
    ): SingleRevenueResponse

    @Mapping(target = "id", source = "id")
    @Mapping(target = "date", source = "source.date")
    fun fromRequestToDocument(source: SingleRevenueRequest, id: ObjectId? = null): SingleRevenueDocument

    fun fromParentRevenueToResponse(source: ScheduledRevenueResponse): SingleRevenueParentResponse

}