interface Props {
    amount?: number
}

export const AmountTableCell = (props: Props) => {
    const {amount} = props
    return (
        <b>{amount?.toLocaleString(undefined, {minimumFractionDigits: 2})}</b>
    )
}