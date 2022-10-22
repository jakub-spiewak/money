package com.jakubspiewak.money.expense.scheduled

import com.jakubspiewak.money.common.mappper.CommonMapperConfig
import com.jakubspiewak.money.expense.scheduled.type.ScheduledExpenseRequest
import com.jakubspiewak.money.expense.scheduled.type.ScheduledExpenseResponse
import com.jakubspiewak.money.person.type.PersonResponse
import com.jakubspiewak.money.tag.type.TagResponse
import org.bson.types.ObjectId
import org.mapstruct.Mapper
import org.mapstruct.Mapping

@Mapper(config = CommonMapperConfig::class)
interface ScheduledExpenseMapper {

    @Mapping(target = "id", source = "source.id")
    @Mapping(target = "tags", source = "tags")
    @Mapping(target = "person", source = "person")
    @Mapping(target = "date.to", source = "source.dateTo")
    @Mapping(target = "date.from", source = "source.dateFrom")
    fun fromDocumentToResponse(
        source: ScheduledExpenseDocument,
        person: PersonResponse?,
        tags: List<TagResponse>
    ): ScheduledExpenseResponse

    @Mapping(target = "dateFrom", source = "source.date.from")
    @Mapping(target = "dateTo", source = "source.date.to")
    fun fromRequestToDocument(source: ScheduledExpenseRequest, id: ObjectId? = null): ScheduledExpenseDocument

}