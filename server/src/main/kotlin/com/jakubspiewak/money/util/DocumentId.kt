package com.jakubspiewak.money.util

import com.fasterxml.jackson.databind.annotation.JsonSerialize
import org.springframework.data.annotation.Id

@Id
@JsonSerialize(using = MongodbObjectIdSerializer::class)
@Target(AnnotationTarget.FIELD)
@Retention(AnnotationRetention.RUNTIME)
annotation class DocumentId {
}