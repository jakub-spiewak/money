import {ScheduledExpenseResponse} from "../../../../redux/generated/redux-api";
import {ActionButtonsTableCell} from "../../../util/table/ActionButtonsTableCell";
import {Box, Collapse, Fade, Heading, HStack, IconButton, Td, Text, Tr, VStack} from "@chakra-ui/react";
import {AmountTableCell} from "../../../util/table/AmountTableCell";
import {visualizePerson} from "../../../util/table/PersonTableCell";
import {ExpenseTableTagsCell} from "../../ExpenseTableTagsCell";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {useState} from "react";
import {ExpenseTableContentProps} from "../../types";

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
                                                <Heading>{expense.amount?.data?.value?.toLocaleString(undefined, {minimumFractionDigits: 2})}</Heading>
                                                <ActionButtonsTableCell
                                                    onEdit={() => onEdit(expense)}
                                                    onDelete={() => onDelete(expense)}
                                                    name={expense.name || ''}
                                                />
                                            </HStack>
                                            <VStack alignItems={"start"}>
                                                <HStack>
                                                    <Text as={"b"}>
                                                        Person:
                                                    </Text>
                                                    <Box>{visualizePerson(expense.person)}</Box>
                                                </HStack>
                                                <ExpenseTableTagsCell
                                                    mobile
                                                    tags={expense.tags || []}
                                                />
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
