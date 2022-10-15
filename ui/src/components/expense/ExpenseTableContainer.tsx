import {ReactNode} from "react";
import {Table, TableContainer} from "@chakra-ui/react";
import {theme} from "../../theme";

interface Props {
    children: ReactNode | ReactNode[]
}

export const ExpenseTableContainer = (props: Props) => {
    const {children} = props

    return (

        <TableContainer width={["100vw", null, null, theme.breakpoints.lg]}>
            <Table
                variant='simple'
                size={'sm'}
            >
                {children}
            </Table>
        </TableContainer>
    )
}