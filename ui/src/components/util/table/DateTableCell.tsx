import {Fragment} from "react";

interface Props {
    date?: string
}

export const DateTableCell = (props: Props) => {
    const {date} = props
    return (
        <Fragment>
            {date ? new Date(date).toLocaleDateString() : '-'}
        </Fragment>
    )
}