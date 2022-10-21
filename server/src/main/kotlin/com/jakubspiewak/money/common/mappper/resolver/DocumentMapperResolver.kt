package com.jakubspiewak.money.common.mappper.resolver

import org.bson.types.ObjectId
import org.springframework.stereotype.Component

@Component
class DocumentMapperResolver {
    fun objectIdToString(id: ObjectId): String {
        return id.toString()
    }

    fun stringToObjectId(id: String): ObjectId {
        return ObjectId(id)
    }
}