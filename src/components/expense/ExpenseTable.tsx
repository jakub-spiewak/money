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
    IconButton, HStack, useDisclosure, Button, Tag, TagLabel, Flex,
} from "@chakra-ui/react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {useState} from "react";
import {DeleteAlertDialog} from "../util/DeleteAlertDialog";
import {ExpenseType} from "../../utils/CommonTypes";
import {useGlobalContext} from "../../utils/Context";
import {AiOutlineHome} from "react-icons/ai";

interface ExpenseTableProps {
    expenses: ExpenseType[],
    onAdd: () => void;
    onEdit: (expense: ExpenseType) => void,
    onDelete: (expense: ExpenseType) => void,
}

export const ExpenseTable = (props: ExpenseTableProps) => {
    const {expenses, onEdit, onDelete: onDeleteFromProps, onAdd} = props
    const {persons, tags} = useGlobalContext()

    const {isOpen, onClose, onOpen} = useDisclosure()
    const [deleteValue, setDeleteValue] = useState<ExpenseType>()

    const onDelete = (expense: ExpenseType) => {
        setDeleteValue(expense)
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
                            expenses.map((expense, index) => {
                                const person = persons.find(p => p.id === expense.personId)
                                return (
                                    <Tr key={`expense${index}`}>
                                        <Td>{expense.name}</Td>
                                        <Td>{person ? `${person.firstName} ${person.lastName}` : <AiOutlineHome/>}</Td>
                                        <Td isNumeric><b>{expense.amount.toFixed?.(2)}</b></Td>
                                        <Td>
                                            <Flex
                                                wrap={'wrap'}
                                                gap={1}
                                            >
                                                {expense.tagsIds.map((tagId, index) => {
                                                    const tag = tags.find(t => t.id === tagId)
                                                    if (!tag) return null
                                                    return (
                                                        <Tag
                                                            size={'sm'}
                                                            key={`form_selected_tag_${index}`}
                                                            borderRadius='full'
                                                            variant='solid'
                                                            colorScheme='green'
                                                        >
                                                            <TagLabel>{tag.name.toUpperCase()}</TagLabel>
                                                        </Tag>
                                                    )
                                                })}
                                            </Flex>
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
            <DeleteAlertDialog
                isOpen={isOpen}
                onClose={onClose}
                onYes={onYes}
                message={`Are you sure to delete ${deleteValue?.name} tag?`}
            />
        </>
    )
}