import {ReactNode} from "react";
import {Table, TableContainer} from "@chakra-ui/react";

interface Props {
    children: ReactNode | ReactNode[]
}

export const SimpleTableContainer = (props: Props) => {
    const {children} = props
    return (
        <TableContainer w={"full"}>
            <Table
                variant='simple'
                overflowX={"scroll"}
                size={'sm'}
            >
                {children}
            </Table>
        </TableContainer>
    )
}