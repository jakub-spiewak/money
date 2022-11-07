import {ScheduledExpenseResponse} from "../../../../redux/generated/redux-api";
import {ActionButtonsTableCell} from "../../../util/table/ActionButtonsTableCell";
import {Box, Heading, HStack, Text, VStack} from "@chakra-ui/react";
import {AmountTableCell} from "../../../util/table/AmountTableCell";
import {ExpenseTableTagsCell} from "../../ExpenseTableTagsCell";
import {Fragment, useState} from "react";
import {ExpenseTableContentProps} from "../../types";
import {DateRangeTableCell} from "../../../util/table/DateRangeTableCell";
import {MobileTableRow} from "../../../util/table/MobileTableRow";

export const ScheduledExpenseMobileTableContent = (props: ExpenseTableContentProps<ScheduledExpenseResponse>) => {
    const [currentItemId, setCurrentItemId] = useState<string>()
    const {expenses, onEdit, onDelete} = props

    return (
        <>
            {
                expenses.map((expense, index) => {
                    const isOpen = expense.id === currentItemId
                    return (
                        <MobileTableRow
                            key={`expense_${index}`}
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
                                        <Heading>
                                            <Text>{expense.name}</Text>
                                        </Heading>
                                        <ActionButtonsTableCell
                                            onEdit={() => onEdit(expense)}
                                            onDelete={() => onDelete(expense)}
                                            name={expense.name || ''}
                                        />
                                    </HStack>
                                    <VStack
                                        alignItems={"start"}
                                        gap={3}
                                    >
                                        <Heading
                                            pt={2}
                                            size={"md"}
                                            fontWeight={"hairline"}
                                        >
                                            <AmountTableCell amount={expense.amount}/>
                                        </Heading>
                                        <ExpenseTableTagsCell tags={expense.tags || []}/>
                                        <VStack
                                            gap={1}
                                            alignItems={"start"}
                                        >
                                            <DateRangeTableCell
                                                date={expense.date}
                                                emptyDateComponent={<Fragment/>}
                                            />
                                        </VStack>
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
