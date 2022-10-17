package com.jakubspiewak.money.tag

import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field
import org.springframework.stereotype.Indexed

@Indexed
@Document(TagDocument.COLLECTION)
class TagDocument(
        @Id
        var id: ObjectId = ObjectId.get(),
        @Field(NAME_FIELD)
        var name: String = "",
) {
    companion object {
        const val COLLECTION = "tag"

        const val NAME_FIELD = "name"
    }
}