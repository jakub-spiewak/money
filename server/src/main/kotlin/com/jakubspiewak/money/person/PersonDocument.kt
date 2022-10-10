package com.jakubspiewak.money.person

import com.fasterxml.jackson.databind.annotation.JsonSerialize
import com.jakubspiewak.money.util.MongodbObjectIdSerializer
import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field
import org.springframework.stereotype.Indexed

@Indexed
@Document
class PersonDocument(
    @Id
    @JsonSerialize(using = MongodbObjectIdSerializer::class)
    var id: ObjectId = ObjectId.get(),
    @Field(FIRST_NAME_FIELD)
    var firstName: String = "",
    @Field(LAST_NAME_FIELD)
    var lastName: String = "",
) {
    companion object {
        const val FIRST_NAME_FIELD = "firstName"
        const val LAST_NAME_FIELD = "lastName"
    }
}