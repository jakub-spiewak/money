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
import {DeleteAlertDialog} from "../../util/DeleteAlertDialog";
import {AiOutlineHome} from "react-icons/ai";
import {ScheduledExpenseResponse} from "../../../redux/generated/redux-api";
import {LoadingDataTable} from "../../util/LoadingDataTable";
import {ExpenseTableTagsCell} from "../ExpenseTableTagsCell";

interface Props {
    expenses: ScheduledExpenseResponse[],
    onAdd: () => void;
    onEdit: (expense: ScheduledExpenseResponse) => void,
    onDelete: (expense: ScheduledExpenseResponse) => void,
    isLoading?: boolean
}

export const ScheduledExpenseTable = (props: Props) => {
    const {isLoading, expenses, onEdit, onDelete: onDeleteFromProps, onAdd} = props

    const {isOpen, onClose, onOpen} = useDisclosure()
    const [deleteValue, setDeleteValue] = useState<ScheduledExpenseResponse>()

    const onDelete = (expense: ScheduledExpenseResponse) => {
        setDeleteValue(expense)
        onOpen()
    }

    const onYes = () => {
        if (deleteValue) onDeleteFromProps(deleteValue)
    }

    return (
        <>
            <VStack maxW={"100vw"}>
                <TableContainer minW={"50vw"}>
                    <Table
                        variant='simple'
                        size={'sm'}
                    >
                        <TableCaption>
                            Scheduled expenses
                        </TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th isNumeric>Amount</Th>
                                <Th>Person</Th>
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
                                                <Td isNumeric><b>{expense.amount?.toFixed?.(2)}</b></Td>
                                                <Td>
                                                    {
                                                        expense.person ? `${expense.person.firstName} ${expense.person.lastName}` :
                                                            <AiOutlineHome/>
                                                    }
                                                </Td>
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
                    <Button onClick={onAdd}>Add scheduled expense</Button>
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