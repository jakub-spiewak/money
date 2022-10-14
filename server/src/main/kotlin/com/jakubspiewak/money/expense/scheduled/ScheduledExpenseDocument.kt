package com.jakubspiewak.money.expense.scheduled

import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field
import org.springframework.data.mongodb.core.mapping.FieldType
import org.springframework.stereotype.Indexed
import java.math.BigDecimal

@Indexed
@Document(ScheduledExpenseDocument.COLLECTION)
class ScheduledExpenseDocument(
    @Id
    var id: ObjectId = ObjectId.get(),
    @Field(NAME_FIELD)
    var name: String = "",
    @Field(name = AMOUNT_FIELD, targetType = FieldType.DECIMAL128)
    var amount: BigDecimal = BigDecimal.ZERO,
    @Field(name = PERSON_FIELD, targetType = FieldType.OBJECT_ID)
    var person: ObjectId?,
    @Field(name = TAGS_FIELD, targetType = FieldType.OBJECT_ID)
    var tags: List<ObjectId> = listOf()
) {
    companion object {
        const val COLLECTION = "scheduled_expense"
        const val NAME_FIELD = "name"
        const val AMOUNT_FIELD = "amount"
        const val PERSON_FIELD = "person"
        const val TAGS_FIELD = "tags"
    }
}