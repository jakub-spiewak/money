import {Amount} from "../../../redux/generated/redux-api";
import {toCurrencyString} from "../../../utils/util";
import {Flex, HStack, Text} from "@chakra-ui/react";

interface Props {
    amount?: Amount,
}

export const AmountTableCell = (props: Props) => {
    const {amount} = props

    if (!amount) return null

    const {type, data} = amount

    if (type === "CONSTANT") return (
        <text>{toCurrencyString(data.value)}</text>
    )

    if (type === "RANGE") return (
        <div>
            <text>{toCurrencyString(data.min)}</text>
            <span> - </span>
            <text>{toCurrencyString(data.max)}</text>
        </div>
    )

    if (type === "PERCENTAGE") return (
        <Flex
            flexWrap={"wrap"}
            justifyContent={"flex-end"}
        >
            <Text>{toCurrencyString(data.value)}</Text>
            <HStack justifyContent={"flex-end"}>
                <Text pl={2}>±</Text>
                <Text>{data.percentage?.toLocaleString()}%</Text>
            </HStack>
        </Flex>
    )

    return (
        <text>{JSON.stringify(amount)}</text>
    )
}