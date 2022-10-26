package com.jakubspiewak.money.expense.single

import com.jakubspiewak.money.common.mappper.CommonMapperConfig
import com.jakubspiewak.money.expense.scheduled.type.ScheduledExpenseResponse
import com.jakubspiewak.money.expense.single.type.SingleExpenseParentResponse
import com.jakubspiewak.money.expense.single.type.SingleExpenseRequest
import com.jakubspiewak.money.expense.single.type.SingleExpenseResponse
import com.jakubspiewak.money.tag.type.TagResponse
import org.bson.types.ObjectId
import org.mapstruct.Mapper
import org.mapstruct.Mapping

@Mapper(config = CommonMapperConfig::class)
interface SingleExpenseMapper {

    @Mapping(target = "id", source = "source.id")
    @Mapping(target = "name", source = "source.name")
    @Mapping(target = "tags", source = "tags")
    @Mapping(target = "amount", source = "source.amount")
    @Mapping(target = "date", source = "source.date")
    @Mapping(target = "parentExpense", source = "parentExpense")
    fun fromDocumentToResponse(
        source: SingleExpenseDocument,
        tags: List<TagResponse>,
        parentExpense: SingleExpenseParentResponse?
    ): SingleExpenseResponse

    @Mapping(target = "id", source = "id")
    @Mapping(target = "date", source = "source.date")
    fun fromRequestToDocument(source: SingleExpenseRequest, id: ObjectId? = null): SingleExpenseDocument

    fun fromParentExpenseToResponse(source: ScheduledExpenseResponse): SingleExpenseParentResponse
}