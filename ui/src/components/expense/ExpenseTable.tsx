import {
    Box,
    Button,
    HStack,
    IconButton,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
    useDisclosure, VStack,
} from "@chakra-ui/react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {useState} from "react";
import {DeleteAlertDialog} from "../util/DeleteAlertDialog";
import {AiOutlineHome} from "react-icons/ai";
import {ExpenseResponse} from "../../redux/generated/redux-api";
import {LoadingDataTable} from "../util/LoadingDataTable";
import {ExpenseTableTagsCell} from "./ExpenseTableTagsCell";

interface ExpenseTableProps {
    expenses: ExpenseResponse[],
    onAdd: () => void;
    onEdit: (expense: ExpenseResponse) => void,
    onDelete: (expense: ExpenseResponse) => void,
    isLoading?: boolean
}

export const ExpenseTable = (props: ExpenseTableProps) => {
    const {isLoading, expenses, onEdit, onDelete: onDeleteFromProps, onAdd} = props

    const {isOpen, onClose, onOpen} = useDisclosure()
    const [deleteValue, setDeleteValue] = useState<ExpenseResponse>()

    const onDelete = (expense: ExpenseResponse) => {
        setDeleteValue(expense)
        onOpen()
    }

    const onYes = () => {
        if (deleteValue) onDeleteFromProps(deleteValue)
    }

    return (
        <>
            <VStack maxW={"100vw"}>
                <TableContainer>
                    <Table
                        variant='simple'
                        size={'sm'}
                    >
                        <TableCaption>
                            Expenses
                        </TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Person</Th>
                                <Th isNumeric>Amount</Th>
                                <Th>Tags</Th>
                                <Th isNumeric>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                isLoading ?
                                    <LoadingDataTable size={5}/> :
                                    expenses.map((expense, index) => {
                                        return (
                                            <Tr key={`expense${index}`}>
                                                <Td>{expense.name}</Td>
                                                <Td>
                                                    {
                                                        expense.person ? `${expense.person.firstName} ${expense.person.lastName}` :
                                                            <AiOutlineHome/>
                                                    }
                                                </Td>
                                                <Td isNumeric><b>{expense.amount?.toFixed?.(2)}</b></Td>
                                                <Td>
                                                    <ExpenseTableTagsCell tags={expense.tags || []}/>
                                                </Td>
                                                <Td isNumeric>
                                                    <Box>
                                                        <IconButton
                                                            aria-label={'edit'}
                                                            icon={<EditIcon/>}
                                                            colorScheme={'teal'}
                                                            mr={2}
                                                            onClick={() => onEdit(expense)}
                                                        />
                                                        <IconButton
                                                            aria-label={'delete'}
                                                            icon={<DeleteIcon/>}
                                                            colorScheme={'red'}
                                                            onClick={() => onDelete(expense)}
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
                                <Th>Tags</Th>
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
                    <Button onClick={onAdd}>Add expense</Button>
                </HStack>
            </VStack>
            <DeleteAlertDialog
                isOpen={isOpen}
                onClose={onClose}
                onYes={onYes}
                message={`Are you sure to delete ${deleteValue?.name} tag?`}
            />
        </>
    )
}