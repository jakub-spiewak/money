package com.jakubspiewak.money.revenue.single

import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field
import org.springframework.data.mongodb.core.mapping.FieldType
import org.springframework.stereotype.Indexed
import java.math.BigDecimal
import java.time.LocalDate

@Indexed
@Document(SingleRevenueDocument.COLLECTION)
class SingleRevenueDocument(
        @Id
        var id: ObjectId = ObjectId.get(),
        @Field(NAME_FIELD)
        var name: String = "",
        @Field(name = AMOUNT_FIELD, targetType = FieldType.DECIMAL128)
        var amount: BigDecimal = BigDecimal.ZERO,
        @Field(name = DATE_FIELD, targetType = FieldType.DATE_TIME)
        var date: LocalDate = LocalDate.now(),
        @Field(name = PERSON_FIELD, targetType = FieldType.OBJECT_ID)
        var person: ObjectId,
) {
    companion object {
        const val COLLECTION = "single_revenue"

        const val NAME_FIELD = "name"
        const val AMOUNT_FIELD = "amount"
        const val DATE_FIELD = "date"
        const val PERSON_FIELD = "person"
    }
}