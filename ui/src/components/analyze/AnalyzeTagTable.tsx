import {Box, Divider, Flex, HStack, Spacer, Text} from "@chakra-ui/react";
import {TagSummary} from "../../redux/generated/redux-api";
import {DynamicGrid} from "../util/dynamic-grid/DynamicGrid";
import {toCurrencyString} from "../../utils/util";

interface Props {
    tags: TagSummary[]
}

export const AnalyzeTagTable = (props: Props) => {
    const {tags} = props

    return (
        <DynamicGrid>
            {
                tags.map((tag, index) => {
                    return (
                        <Flex
                            key={`summary_tag_${index}`}
                            p={4}
                            flexDirection={"column"}
                            w={"full"}
                        >
                            <HStack>
                                <Text fontSize={"2xl"} fontWeight={"extrabold"}>{tag.name}</Text>
                                <Spacer/>
                                <Text fontSize={"4xl"} fontWeight={"hairline"}>{toCurrencyString(tag.amount)}</Text>
                            </HStack>
                            <HStack w={"max-content"}>
                                <Text>{`${(tag.revenuesFactor * 100).toFixed(2)}%`}</Text>
                                <Text fontWeight={"hairline"}>of revenues</Text>
                            </HStack>
                            <HStack w={"max-content"}>
                                <Text>{`${(tag.expensesFactor * 100).toFixed(2)}%`}</Text>
                                <Text fontWeight={"hairline"}>of expenses</Text>
                            </HStack>
                            <Divider my={2}/>
                            <Flex flexDirection={"column"} gap={4}>
                                {tag.expenses.map((expense, index2) => {
                                    return (
                                        <HStack key={`summary_tag_${index}_${index2}`} justifyContent={"space-between"}>
                                            <Text>
                                                {expense.name}
                                            </Text>
                                            <Box>
                                                <Text w={"max-content"}>
                                                    {`${toCurrencyString(expense.amount)} (${(expense.factor * 100).toFixed(2)}%)`}
                                                </Text>
                                            </Box>
                                        </HStack>
                                    )
                                })}
                            </Flex>
                        </Flex>
                    )
                })
            }
        </DynamicGrid>
    )
}