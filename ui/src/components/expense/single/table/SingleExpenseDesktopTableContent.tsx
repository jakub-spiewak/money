import {SingleExpenseResponse} from "../../../../redux/generated/redux-api";
import {ActionButtonsTableCell} from "../../../util/table/ActionButtonsTableCell";
import {Td, Tr} from "@chakra-ui/react";
import {AmountTableCell} from "../../../util/table/AmountTableCell";
import {DateTableCell} from "../../../util/table/DateTableCell";
import {ExpenseTableTagsCell} from "../../ExpenseTableTagsCell";
import {ExpenseTableContentProps} from "../../types";
import {ExpenseParentTableCell} from "../../../util/table/ExpenseParentTableCell";

export const SingleExpenseDesktopTableContent = (props: ExpenseTableContentProps<SingleExpenseResponse> & { onExpenseClick?: (id: string) => void, }) => {
    const {expenses, onEdit, onDelete, onExpenseClick} = props

    return (
        <>
            {
                expenses.map((expense, index) => {
                    return (
                        <Tr
                            key={`expense${index}`}
                            onPointerEnter={() => onExpenseClick?.(expense.parentExpense?.id || '')}
                            onPointerLeave={() => onExpenseClick?.("")}
                        >
                            <Td>{expense.name}</Td>
                            <Td isNumeric>
                                <AmountTableCell
                                    amount={{
                                        type: "CONSTANT",
                                        data: {
                                            value: expense.amount
                                        }
                                    }}
                                />
                            </Td>
                            <Td>
                                <ExpenseParentTableCell expense={expense.parentExpense}/>
                            </Td>
                            <Td>
                                <DateTableCell date={expense.date}/>
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
