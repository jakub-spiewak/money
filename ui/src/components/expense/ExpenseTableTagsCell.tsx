import {Box, Flex, Tag, TagLabel} from "@chakra-ui/react";
import {TagResponse} from "../../redux/generated/redux-api";

interface Props {
    tags: TagResponse[]
}

export const ExpenseTableTagsCell = (props: Props) => {
    const {tags} = props
    return (
        <Box
            width={"3xs"}
        >
            <Flex
                wrap={'wrap'}
                gap={1}
            >
                {tags
                    .filter(tag => !!tag)
                    .sort((a, b) => a.name?.localeCompare(b.name || '') || 0)
                    .map((tag, index) => {
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
        </Box>
    )
}