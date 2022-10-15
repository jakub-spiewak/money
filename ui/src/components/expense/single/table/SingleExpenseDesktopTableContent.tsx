import {SingleExpenseResponse} from "../../../../redux/generated/redux-api";
import {ActionButtonsTableCell} from "../../../util/table/ActionButtonsTableCell";
import {Td, Tr} from "@chakra-ui/react";
import {AmountTableCell} from "../../../util/table/AmountTableCell";
import {DateTableCell} from "../../../util/table/DateTableCell";
import {PersonTableCell} from "../../../util/table/PersonTableCell";
import {ExpenseTableTagsCell} from "../../ExpenseTableTagsCell";
import {ExpenseTableContentProps} from "../../types";

export const SingleExpenseDesktopTableContent = (props: ExpenseTableContentProps<SingleExpenseResponse>) => {
    const {expenses, onEdit, onDelete} = props

    return (
        <>
            {
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
                                    name={expense.name || ''}
                                />
                            </Td>
                        </Tr>
                    )
                })
            }
        </>
    )
}
