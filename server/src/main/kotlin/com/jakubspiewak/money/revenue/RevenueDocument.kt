package com.jakubspiewak.money.revenue

import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field
import org.springframework.stereotype.Indexed
import java.math.BigDecimal

@Indexed
@Document
class RevenueDocument(
    @Id
    var id: ObjectId = ObjectId.get(),
    @Field(NAME_FIELD)
    var name: String = "",
    @Field(AMOUNT_FIELD)
    var amount: BigDecimal = BigDecimal.ZERO,
    @Field(PERSON_FIELD)
    var person: ObjectId,
) {
    companion object {
        const val NAME_FIELD = "name"
        const val AMOUNT_FIELD = "amount"
        const val PERSON_FIELD = "person"
    }
}