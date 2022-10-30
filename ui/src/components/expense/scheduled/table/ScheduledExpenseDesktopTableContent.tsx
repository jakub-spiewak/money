import {ScheduledExpenseResponse} from "../../../../redux/generated/redux-api";
import {ActionButtonsTableCell} from "../../../util/table/ActionButtonsTableCell";
import {HStack, Td, Text, Tr} from "@chakra-ui/react";
import {AmountTableCell} from "../../../util/table/AmountTableCell";
import {ExpenseTableTagsCell} from "../../ExpenseTableTagsCell";
import {ExpenseTableContentProps} from "../../types";
import {DateRangeTableCell} from "../../../util/table/DateRangeTableCell";
import {Fragment} from "react";
import {SmallPercentageChart} from "../../../util/chart/SmallPercentageChart";

export const ScheduledExpenseDesktopTableContent = (props: ExpenseTableContentProps<ScheduledExpenseResponse> & { currentExpense?: string }) => {
    const {expenses, onEdit, onDelete, currentExpense} = props

    return (
        <Fragment>
            {
                expenses.map((expense, index) => {
                    return (
                        <Tr
                            key={`expense${index}`}
                            backgroundColor={currentExpense === expense.id ? "teal.800" : undefined}
                            shadow={currentExpense === expense.id ? "2xl" : undefined}
                        >
                            <Td>
                                <HStack>
                                    <SmallPercentageChart value={expense.spentPercentage || 0}/>
                                    <Text>
                                        {expense.name}
                                    </Text>
                                </HStack>
                            </Td>
                            <Td isNumeric>
                                <AmountTableCell amount={expense.amount}/>
                            </Td>
                            <Td>
                                <DateRangeTableCell date={expense.date}/>
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
        </Fragment>
    )
}
