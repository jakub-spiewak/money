import {
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Tfoot,
    Th,
    Thead,
    Tr, useBreakpointValue,
} from "@chakra-ui/react";
import {ScheduledExpenseResponse} from "../../../redux/generated/redux-api";
import {LoadingDataTable} from "../../util/LoadingDataTable";
import {useMemo} from "react";
import {ScheduledExpenseMobileTableContent} from "./table/ScheduledExpenseMobileTableContent";
import {ScheduledExpenseDesktopTableContent} from "./table/ScheduledExpenseDesktopTableContent";
import {ExpenseTableProps} from "../types";

const TableDesktopHeading = () => (
    <Tr>
        <Th>Name</Th>
        <Th isNumeric>Amount</Th>
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

export const ScheduledExpenseTable = (props: ExpenseTableProps<ScheduledExpenseResponse>) => {
    const {isLoading, expenses, onEdit, onDelete} = props

    const isMobile = useBreakpointValue({base: true, md: false}, {fallback: 'md'})

    const TableContent = useMemo(() => isMobile ? ScheduledExpenseMobileTableContent : ScheduledExpenseDesktopTableContent, [isMobile])
    const TableHeading = useMemo(() => isMobile ? TableMobileHeading : TableDesktopHeading, [isMobile])

    return (
        <TableContainer minW={["100vw", null, "50vw"]}>
            <Table
                variant='simple'
                size={'sm'}
            >
                <TableCaption>
                    Scheduled expenses
                </TableCaption>
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