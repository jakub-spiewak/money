import {ScheduledExpenseResponse} from "../../../../redux/generated/redux-api";
import {ActionButtonsTableCell} from "../../../util/table/ActionButtonsTableCell";
import {Box, Collapse, Fade, Heading, HStack, IconButton, Td, Text, Tr, VStack} from "@chakra-ui/react";
import {AmountTableCell} from "../../../util/table/AmountTableCell";
import {ExpenseTableTagsCell} from "../../ExpenseTableTagsCell";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {Fragment, useState} from "react";
import {ExpenseTableContentProps} from "../../types";
import {DateRangeTableCell} from "../../../util/table/DateRangeTableCell";

export const ScheduledExpenseMobileTableContent = (props: ExpenseTableContentProps<ScheduledExpenseResponse>) => {
    const [currentItemIndex, setCurrentItemIndex] = useState<string>()
    const {expenses, onEdit, onDelete} = props

    return (
        <>
            {
                expenses.map((expense, index) => {
                    const isDetailsOpen = expense.id === currentItemIndex
                    return (
                        <>
                            <Tr key={`expense_${index}`}>
                                <Td maxW={"50vw"}>
                                    <Text
                                        fontSize={'xl'}
                                        overflow={"hidden"}
                                        textOverflow={"ellipsis"}
                                    >
                                        {expense.name}
                                    </Text>
                                </Td>
                                <Td isNumeric>
                                    <Fade in={!isDetailsOpen}>
                                        <AmountTableCell amount={expense.amount}/>
                                    </Fade>
                                </Td>
                                <Td isNumeric>
                                    <IconButton
                                        aria-label={'edit'}
                                        icon={
                                            <ChevronDownIcon
                                                transition={"all"}
                                                transitionDuration={".5s"}
                                                transform={isDetailsOpen ? "rotate(180deg)" : "rotate(0deg)"}
                                            />
                                        }
                                        variant={'ghost'}
                                        onClick={() => setCurrentItemIndex(isDetailsOpen ? undefined : expense.id)}
                                    />
                                </Td>
                            </Tr>
                            <Tr>
                                <Td
                                    py={0}
                                    colSpan={3}
                                >
                                    <Collapse
                                        animateOpacity
                                        in={isDetailsOpen}
                                    >
                                        <Box py={4}>
                                            <HStack
                                                justifyContent={"space-between"}
                                                gap={8}
                                            >
                                                <Heading>
                                                    <AmountTableCell amount={expense.amount}/>
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
                                    </Collapse>
                                </Td>
                            </Tr>
                        </>
                    )
                })
            }
        </>
    )
}
