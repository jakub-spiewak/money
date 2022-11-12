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
        <span>{toCurrencyString(data.value)}</span>
    )

    if (type === "RANGE") return (
        <Flex
            flexWrap={"wrap"}
            justifyContent={"flex-end"}
        >
            <Text>{toCurrencyString(data.min)}</Text>
            <HStack justifyContent={"flex-end"}>
                <Text pl={2}>to</Text>
                <Text>{toCurrencyString(data.max)}</Text>
            </HStack>
        </Flex>
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
        <div>{JSON.stringify(amount)}</div>
    )
}