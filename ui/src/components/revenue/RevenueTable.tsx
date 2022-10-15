import {
    Button,
    HStack,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
    VStack,
} from "@chakra-ui/react";
import {RevenueResponse} from "../../redux/generated/redux-api";
import {LoadingDataTable} from "../util/LoadingDataTable";
import {ActionButtonsTableCell} from "../util/ActionButtonsTableCell";

interface Props {
    revenues: RevenueResponse[],
    onAdd: () => void;
    onEdit: (revenue: RevenueResponse) => void,
    onDelete: (revenue: RevenueResponse) => void,
    isLoading?: boolean
}

const TableHeadings = () => (
    <Tr>
        <Th>Name</Th>
        <Th>Person</Th>
        <Th isNumeric>Amount</Th>
        <Th isNumeric>Actions</Th>
    </Tr>
)

export const RevenueTable = (props: Props) => {
    const {isLoading, revenues, onEdit, onDelete, onAdd} = props

    return (
        <VStack maxW={"100vw"}>
            <TableContainer>
                <Table
                    variant='simple'
                    size={'sm'}
                >
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
                                revenues.map((revenue, index) => {
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
                                                    deleteMessage={`Are you sure to delete ${revenue?.name} tag?`}
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
                </Table>
            </TableContainer>
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