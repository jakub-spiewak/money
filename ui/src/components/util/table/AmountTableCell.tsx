import {Amount} from "../../../redux/generated/redux-api";

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
        <div>
            <b>{data.min?.toLocaleString(undefined, {minimumFractionDigits: 2})}</b>
            <span> - </span>
            <b>{data.max?.toLocaleString(undefined, {minimumFractionDigits: 2})}</b>
        </div>
        // <SimpleGrid columns={2}>
        //     <div>From:</div>
        //     <b>{number2string(data.min)}</b>
        //     <div>To:</div>
        //     <b>{number2string(data.max)}</b>
        // </SimpleGrid>
    )
    if (type === "PERCENTAGE") return (
        <div>
            <b>{data.value}</b>
            <span> ± </span>
            <b>{data.percentage?.toLocaleString()}%</b>
        </div>
    )

    return (
        <b>{JSON.stringify(amount)}</b>
    )
}