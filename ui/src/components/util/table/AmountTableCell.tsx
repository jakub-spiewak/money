import {Amount} from "../../../redux/generated/redux-api";
import {SimpleGrid} from "@chakra-ui/react";

interface Props {
    amount?: Amount
}

const number2string = (value?: number): string => value?.toLocaleString(undefined, {minimumFractionDigits: 2}) || ''

export const AmountTableCell = (props: Props) => {
    const {amount} = props
    if (!amount) return null

    const {type, data} = amount
    if (!type || !data) return null

    if (type === "CONSTANT") return <b>{number2string(data.value)}</b>
    if (type === "RANGE") return (
        <SimpleGrid columns={2}>
            <div>From:</div>
            <b>{number2string(data.min)}</b>
            <div>To:</div>
            <b>{number2string(data.max)}</b>
        </SimpleGrid>
    )

    return (
        <b>{JSON.stringify(amount)}</b>
    )
}