package com.jakubspiewak.money.tag

import com.jakubspiewak.money.common.mappper.CommonMapperConfig
import com.jakubspiewak.money.tag.type.TagRequest
import com.jakubspiewak.money.tag.type.TagResponse
import org.bson.types.ObjectId
import org.mapstruct.Mapper

@Mapper(config = CommonMapperConfig::class)
interface TagMapper {
   fun documentToResponse(source: TagDocument): TagResponse
   fun requestToDocument(source: TagRequest, id: ObjectId? = null): TagDocument
}