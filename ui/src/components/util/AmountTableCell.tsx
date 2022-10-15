interface Props {
    amount?: number
}

export const AmountTableCell = (props: Props) => {
    const {amount} = props
    return (
        <b>{amount?.toFixed?.(2)}</b>
    )
}