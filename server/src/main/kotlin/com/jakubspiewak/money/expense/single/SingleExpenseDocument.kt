package com.jakubspiewak.money.expense.single

import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field
import org.springframework.data.mongodb.core.mapping.FieldType
import org.springframework.stereotype.Indexed
import java.math.BigDecimal
import java.time.Instant
import java.util.*

@Indexed
@Document(SingleExpenseDocument.COLLECTION)
class SingleExpenseDocument(
        @Id
        var id: ObjectId = ObjectId.get(),
        @Field(NAME_FIELD)
        var name: String = "",
        @Field(name = AMOUNT_FIELD, targetType = FieldType.DECIMAL128)
        var amount: BigDecimal = BigDecimal.ZERO,
        @Field(name = PARENT_EXPENSE_FIELD, targetType = FieldType.OBJECT_ID)
        var parentExpense: ObjectId?,
        @Field(name = PERSON_FIELD, targetType = FieldType.OBJECT_ID)
        var person: ObjectId?,
        @Field(name = DATE, targetType = FieldType.DATE_TIME)
        var date: Date = Date.from(Instant.now()),
        @Field(name = TAGS_FIELD, targetType = FieldType.OBJECT_ID)
        var tags: List<ObjectId> = listOf(),
) {
    companion object {
        const val COLLECTION = "single_expense"

        const val NAME_FIELD = "name"
        const val AMOUNT_FIELD = "amount"
        const val PARENT_EXPENSE_FIELD = "parent_expense"
        const val PERSON_FIELD = "person"
        const val TAGS_FIELD = "tags"
        const val DATE = "date"
    }
}