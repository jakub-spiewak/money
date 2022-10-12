import {Flex, Tag, TagLabel} from "@chakra-ui/react";
import {TagResponse} from "../../redux/generated/redux-api";

interface Props {
    tags: TagResponse[]
}

export const ExpenseTableTagsCell = (props: Props) => {
    const {tags} = props
    return (
        <Flex
            wrap={'wrap'}
            gap={1}
        >
            {tags.map((tag, index) => {
                if (!tag) return null
                return (
                    <Tag
                        size={'sm'}
                        key={`form_selected_tag_${index}`}
                        borderRadius='full'
                        variant='solid'
                        colorScheme='green'
                    >
                        <TagLabel>{tag.name?.toUpperCase()}</TagLabel>
                    </Tag>
                )
            })}
        </Flex>
    )
}