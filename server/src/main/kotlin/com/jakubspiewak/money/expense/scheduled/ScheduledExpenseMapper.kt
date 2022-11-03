package com.jakubspiewak.money.expense.scheduled

import com.jakubspiewak.money.common.mappper.CommonMapperConfig
import com.jakubspiewak.money.expense.scheduled.type.ScheduledExpenseRequest
import com.jakubspiewak.money.expense.scheduled.type.ScheduledExpenseResponse
import com.jakubspiewak.money.tag.type.TagResponse
import org.bson.types.ObjectId
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import java.math.BigDecimal

@Mapper(config = CommonMapperConfig::class)
interface ScheduledExpenseMapper {

    @Mapping(target = "id", source = "source.id")
    @Mapping(target = "tags", source = "tags")
    @Mapping(target = "date.to", source = "source.dateTo")
    @Mapping(target = "date.from", source = "source.dateFrom")
    @Mapping(target = "spentFactor", source = "spentFactor")
    @Mapping(target = "spentSum", source = "spentSum")
    fun fromDocumentToResponse(
        source: ScheduledExpenseDocument,
        tags: List<TagResponse>,
        spentFactor: BigDecimal,
        spentSum: BigDecimal,
    ): ScheduledExpenseResponse

    @Mapping(target = "dateFrom", source = "source.date.from")
    @Mapping(target = "dateTo", source = "source.date.to")
    fun fromRequestToDocument(source: ScheduledExpenseRequest, id: ObjectId? = null): ScheduledExpenseDocument

}