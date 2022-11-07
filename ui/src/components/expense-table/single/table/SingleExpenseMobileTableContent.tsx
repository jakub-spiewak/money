import {ActionButtonsTableCell} from "../../../util/table/ActionButtonsTableCell";
import {Box, Heading, HStack, Text, VStack} from "@chakra-ui/react";
import {ExpenseTableTagsCell} from "../../ExpenseTableTagsCell";
import {useState} from "react";
import {ExpenseTableContentProps} from "../../types";
import {SingleExpenseResponse} from "../../../../redux/generated/redux-api";
import {ExpenseParentTableCell} from "../../../util/table/ExpenseParentTableCell";
import {MobileTableRow} from "../../../util/table/MobileTableRow";

export const SingleExpenseMobileTableContent = (props: ExpenseTableContentProps<SingleExpenseResponse>) => {
    const [currentItemId, setCurrentItemId] = useState<string>()
    const {expenses, onEdit, onDelete} = props

    return (
        <>
            {
                expenses.map((expense, index) => {
                    const isOpen = currentItemId === expense.id
                    return (
                        <MobileTableRow
                            key={`expense_single_mobile_row_${index}`}
                            name={expense.name}
                            amount={expense.amount}
                            isOpen={isOpen}
                            onOpenToggle={() => setCurrentItemId(isOpen ? undefined : expense.id)}
                            content={
                                <Box py={4}>
                                    <HStack
                                        justifyContent={"space-between"}
                                        gap={8}
                                    >
                                        <Heading>{expense.amount?.toLocaleString(undefined, {minimumFractionDigits: 2})}</Heading>
                                        <ActionButtonsTableCell
                                            onEdit={() => onEdit(expense)}
                                            onDelete={() => onDelete(expense)}
                                            name={expense.name || ''}
                                        />
                                    </HStack>
                                    <VStack
                                        gap={1}
                                        alignItems={"start"}
                                        pt={4}
                                    >
                                        <HStack>
                                            <Text as={"b"}>
                                                Parent expense:
                                            </Text>
                                            <ExpenseParentTableCell expense={expense.parentExpense}/>
                                        </HStack>
                                        <HStack>
                                            <Text as={"b"}>
                                                Date:
                                            </Text>
                                            <Box>{new Date(expense.date || '').toLocaleDateString()}</Box>
                                        </HStack>
                                        <ExpenseTableTagsCell tags={expense.tags || []}/>
                                    </VStack>
                                </Box>
                            }
                        />
                    )
                })
            }
        </>
    )
}
