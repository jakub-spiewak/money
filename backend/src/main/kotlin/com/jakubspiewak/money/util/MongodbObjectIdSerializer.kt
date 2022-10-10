package com.jakubspiewak.money.util

import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.databind.JsonSerializer
import com.fasterxml.jackson.databind.SerializerProvider
import org.bson.types.ObjectId

public class MongodbObjectIdSerializer : JsonSerializer<ObjectId>() {
    override fun serialize(value: ObjectId?, gen: JsonGenerator?, serializers: SerializerProvider?) {
        gen?.writeString(value.toString())
    }
}