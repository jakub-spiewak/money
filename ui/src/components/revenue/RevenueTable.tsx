import {
    Th,
    Tr,
    Table,
    TableCaption,
    TableContainer,
    Thead,
    Tbody,
    Td,
    Tfoot,
    Box,
    IconButton, HStack, useDisclosure, Button,
} from "@chakra-ui/react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {useState} from "react";
import {DeleteAlertDialog} from "../util/DeleteAlertDialog";
import {RevenueType} from "../../utils/CommonTypes";
import {useGlobalContext} from "../../utils/Context";

interface RevenueTableProps {
    revenues: RevenueType[],
    onAdd: () => void;
    onEdit: (revenue: RevenueType) => void,
    onDelete: (revenue: RevenueType) => void,
}

export const RevenueTable = (props: RevenueTableProps) => {
    const {revenues, onEdit, onDelete: onDeleteFromProps, onAdd} = props
    const {persons} = useGlobalContext()

    const {isOpen, onClose, onOpen} = useDisclosure()
    const [deleteValue, setDeleteValue] = useState<RevenueType>()

    const onDelete = (revenue: RevenueType) => {
        setDeleteValue(revenue)
        onOpen()
    }

    const onYes = () => {
        if (deleteValue) onDeleteFromProps(deleteValue)
    }

    return (
        <>
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>
                        Revenues
                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Person</Th>
                            <Th isNumeric>Amount</Th>
                            <Th isNumeric>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            revenues.map((revenue, index) => {
                                const person = persons.find(p => p.id === revenue.personId)
                                return (
                                    <Tr key={`revenue_${index}`}>
                                        <Td>{revenue.name}</Td>
                                        <Td>{`${person?.firstName} ${person?.lastName}`}</Td>
                                        <Td isNumeric><b>{revenue.amount.toFixed?.(2)}</b></Td>
                                        <Td isNumeric>
                                            <Box>
                                                <IconButton
                                                    aria-label={'edit'}
                                                    icon={<EditIcon/>}
                                                    colorScheme={'teal'}
                                                    mr={2}
                                                    onClick={() => onEdit(revenue)}
                                                />
                                                <IconButton
                                                    aria-label={'delete'}
                                                    icon={<DeleteIcon/>}
                                                    colorScheme={'red'}
                                                    onClick={() => onDelete(revenue)}
                                                />
                                            </Box>
                                        </Td>
                                    </Tr>
                                )
                            })
                        }
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Person</Th>
                            <Th isNumeric>Amount</Th>
                            <Th isNumeric>Actions</Th>
                        </Tr>
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
            <DeleteAlertDialog
                isOpen={isOpen}
                onClose={onClose}
                onYes={onYes}
                message={`Are you sure to delete ${deleteValue?.name} tag?`}
            />
        </>
    )
}