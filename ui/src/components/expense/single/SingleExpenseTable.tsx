import {
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Tfoot,
    Th,
    Thead,
    Tr,
    useBreakpointValue,
} from "@chakra-ui/react";
import {SingleExpenseResponse} from "../../../redux/generated/redux-api";
import {LoadingDataTable} from "../../util/LoadingDataTable";
import {SingleExpenseDesktopTableContent} from "./table/SingleExpenseDesktopTableContent";
import {useMemo} from "react";
import {SingleExpenseMobileTableContent} from "./table/SingleExpenseMobileTableContent";
import {ExpenseTableProps} from "../types";

const TableDesktopHeading = () => (
    <Tr>
        <Th>Name</Th>
        <Th isNumeric>Amount</Th>
        <Th isNumeric>Date</Th>
        <Th>Person</Th>
        <Th>Tags</Th>
        <Th isNumeric>Actions</Th>
    </Tr>
)

const TableMobileHeading = () => (
    <Tr>
        <Th>Name</Th>
        <Th isNumeric>Amount</Th>
        <Th isNumeric>Actions</Th>
    </Tr>
)

export const SingleExpenseTable = (props: ExpenseTableProps<SingleExpenseResponse>) => {
    const {isLoading, expenses, onEdit, onDelete} = props

    const isMobile = useBreakpointValue({base: true, md: false}, {fallback: 'md'})

    const TableContent = useMemo(() => isMobile ? SingleExpenseMobileTableContent : SingleExpenseDesktopTableContent, [isMobile])
    const TableHeading = useMemo(() => isMobile ? TableMobileHeading : TableDesktopHeading, [isMobile])

    return (
        <TableContainer minW={["100vw", null, "50vw"]}>
            <Table
                variant='simple'
                size={'sm'}
            >
                <TableCaption>Single expenses</TableCaption>
                <Thead>
                    <TableHeading/>
                </Thead>
                <Tbody>
                    {
                        isLoading ?
                            <LoadingDataTable size={5}/> :
                            <TableContent
                                expenses={expenses}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                    }
                </Tbody>
                <Tfoot>
                    <TableHeading/>
                </Tfoot>
            </Table>
        </TableContainer>
    )
}