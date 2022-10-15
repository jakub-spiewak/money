import {
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from "@chakra-ui/react";
import {useState} from "react";
import {DeleteAlertDialog} from "../../util/DeleteAlertDialog";
import {SingleExpenseResponse} from "../../../redux/generated/redux-api";
import {LoadingDataTable} from "../../util/LoadingDataTable";
import {ExpenseTableTagsCell} from "../ExpenseTableTagsCell";
import {ActionButtonsTableCell} from "../../util/ActionButtonsTableCell";
import {PersonTableCell} from "../../util/PersonTableCell";
import {AmountTableCell} from "../../util/AmountTableCell";
import {DateTableCell} from "../../util/DateTableCell";

interface Props {
    expenses: SingleExpenseResponse[],
    onEdit: (expense: SingleExpenseResponse) => void,
    onDelete: (expense: SingleExpenseResponse) => void,
    isLoading?: boolean
}

const TableHeading = () => (
    <Tr>
        <Th>Name</Th>
        <Th isNumeric>Amount</Th>
        <Th isNumeric>Date</Th>
        <Th>Person</Th>
        <Th>Tags</Th>
        <Th isNumeric>Actions</Th>
    </Tr>
)

export const SingleExpenseTable = (props: Props) => {
    const {isLoading, expenses, onEdit, onDelete: onDeleteFromProps} = props

    const {isOpen, onClose, onOpen} = useDisclosure()
    const [deleteValue, setDeleteValue] = useState<SingleExpenseResponse>()

    const onDelete = (expense: SingleExpenseResponse) => {
        setDeleteValue(expense)
        onOpen()
    }

    const onYes = () => {
        if (deleteValue) onDeleteFromProps(deleteValue)
    }

    return (
        <>
            <TableContainer minW={"50vw"}>
                <Table
                    variant='simple'
                    size={'sm'}
                >
                    <TableCaption>
                        Single expenses
                    </TableCaption>
                    <Thead>
                        <TableHeading/>
                    </Thead>
                    <Tbody>
                        {
                            isLoading ?
                                <LoadingDataTable size={5}/> :
                                expenses.map((expense, index) => {
                                    return (
                                        <Tr key={`expense${index}`}>
                                            <Td>{expense.name}</Td>
                                            <Td isNumeric>
                                                <AmountTableCell amount={expense.amount}/>
                                            </Td>
                                            <Td>
                                                <DateTableCell date={expense.date}/>
                                            </Td>
                                            <Td>
                                                <PersonTableCell person={expense.person}/>
                                            </Td>
                                            <Td>
                                                <ExpenseTableTagsCell tags={expense.tags || []}/>
                                            </Td>
                                            <Td isNumeric>
                                                <ActionButtonsTableCell
                                                    onEdit={() => onEdit(expense)}
                                                    onDelete={() => onDelete(expense)}
                                                />
                                            </Td>
                                        </Tr>
                                    )
                                })
                        }
                    </Tbody>
                    <Tfoot>
                        <TableHeading/>
                    </Tfoot>
                </Table>
            </TableContainer>
            <DeleteAlertDialog
                isOpen={isOpen}
                onClose={onClose}
                onYes={onYes}
                message={`Are you sure to delete ${deleteValue?.name} tag?`}
            />
        </>
    )
}