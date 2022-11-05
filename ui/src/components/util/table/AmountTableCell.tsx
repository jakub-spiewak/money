import {Amount} from "../../../redux/generated/redux-api";
import {toCurrencyString} from "../../../utils/util";

interface Props {
    amount?: Amount,
}

const number2string = (value?: number): string => value?.toLocaleString(undefined, {minimumFractionDigits: 2}) || ''

export const AmountTableCell = (props: Props) => {
    const {amount} = props
    if (!amount) return null

    const {type, data} = amount
    if (!type || !data) return null

    if (type === "CONSTANT") return <text>{toCurrencyString(data.value)}</text>
    if (type === "RANGE") return (
        <div>
            <text>{toCurrencyString(data.min)}</text>
            <span> - </span>
            <text>{toCurrencyString(data.max)}</text>
        </div>
    )
    if (type === "PERCENTAGE") return (
        <div>
            <text>{toCurrencyString(data.value)}</text>
            <span> ± </span>
            <text>{data.percentage?.toLocaleString()}%</text>
        </div>
    )

    return (
        <text>{JSON.stringify(amount)}</text>
    )
}