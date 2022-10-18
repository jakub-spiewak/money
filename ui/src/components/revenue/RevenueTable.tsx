import {
    Button,
    HStack,
    TableCaption,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
    VStack,
} from "@chakra-ui/react";
import {RevenueResponse} from "../../redux/generated/redux-api";
import {LoadingDataTable} from "../util/table/LoadingDataTable";
import {ActionButtonsTableCell} from "../util/table/ActionButtonsTableCell";
import {SimpleTableProps} from "../util/table/types";
import {theme} from "../../theme";
import {SimpleTableContainer} from "../util/table/SimpleTableContainer";
import {NoDataTable} from "../util/table/NoDataTable";

const TableHeadings = () => (
    <Tr>
        <Th>Name</Th>
        <Th>Person</Th>
        <Th isNumeric>Amount</Th>
        <Th isNumeric>Actions</Th>
    </Tr>
)

export const RevenueTable = (props: SimpleTableProps<RevenueResponse>) => {
    const {isLoading, data, onEdit, onDelete, onAdd} = props

    return (
        <VStack width={["100vw", theme.breakpoints.sm]}>
            <SimpleTableContainer>
                <TableCaption>
                    Revenues
                </TableCaption>
                <Thead>
                    <TableHeadings/>
                </Thead>
                <Tbody>
                    {
                        isLoading ?
                            <LoadingDataTable size={4}/> :
                            data.length === 0 ?
                                <NoDataTable size={4}/> :
                                data.map((revenue, index) => {
                                    const {person} = revenue
                                    return (
                                        <Tr key={`revenue_${index}`}>
                                            <Td>{revenue.name}</Td>
                                            <Td>{`${person?.firstName} ${person?.lastName}`}</Td>
                                            <Td isNumeric><b>{revenue.amount?.toFixed?.(2)}</b></Td>
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
            <HStack
                width={"full"}
                flexDirection={"column-reverse"}
                alignItems={"end"}
            >
                <Button onClick={onAdd}>Add revenue</Button>
            </HStack>
        </VStack>
    )
}