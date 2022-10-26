import {TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr, VStack,} from "@chakra-ui/react";
import {ScheduledRevenueResponse} from "../../../redux/generated/redux-api";
import {LoadingDataTable} from "../../util/table/LoadingDataTable";
import {ActionButtonsTableCell} from "../../util/table/ActionButtonsTableCell";
import {SimpleTableProps} from "../../util/table/types";
import {theme} from "../../../theme";
import {SimpleTableContainer} from "../../util/table/SimpleTableContainer";
import {NoDataTable} from "../../util/table/NoDataTable";
import {DateRangeTableCell} from "../../util/table/DateRangeTableCell";
import {AmountTableCell} from "../../util/table/AmountTableCell";

const TableHeadings = () => (
    <Tr>
        <Th>Name</Th>
        <Th isNumeric>Amount</Th>
        <Th>Date</Th>
        <Th isNumeric>Actions</Th>
    </Tr>
)

export const ScheduledRevenueTable = (props: SimpleTableProps<ScheduledRevenueResponse>) => {
    const {isLoading, data, onEdit, onDelete} = props

    return (
        <VStack width={["100vw", theme.breakpoints.md]}>
            <SimpleTableContainer>
                <TableCaption>
                    ScheduledRevenues
                </TableCaption>
                <Thead>
                    <TableHeadings/>
                </Thead>
                <Tbody>
                    {
                        isLoading ?
                            <LoadingDataTable size={5}/> :
                            data.length === 0 ?
                                <NoDataTable size={5}/> :
                                data.map((revenue, index) => {
                                    return (
                                        <Tr key={`revenue_${index}`}>
                                            <Td>{revenue.name}</Td>
                                            <Td isNumeric>
                                                <AmountTableCell amount={revenue.amount}/>
                                            </Td>
                                            <Td>
                                                <DateRangeTableCell date={revenue.date}/>
                                            </Td>
                                            <Td isNumeric>
                                                <ActionButtonsTableCell
                                                    onEdit={() => onEdit(revenue)}
                                                    onDelete={() => onDelete(revenue)}
                                                    name={revenue?.name || ''}
                                                />
                                            </Td>
                                        </Tr>
                                    )
                                })
                    }
                </Tbody>
                <Tfoot>
                    <TableHeadings/>
                </Tfoot>
            </SimpleTableContainer>
        </VStack>
    )
}