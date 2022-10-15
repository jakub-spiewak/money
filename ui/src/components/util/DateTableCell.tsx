interface Props {
    date?: string
}

export const DateTableCell = (props: Props) => {
    const {date} = props
    return (
        <>
            {date ? new Date(date).toLocaleDateString() : '-'}
        </>
    )
}