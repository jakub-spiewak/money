import {
    Box,
    Divider,
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Spacer,
    Text
} from "@chakra-ui/react";
import {getAmountString, getCurrentDateISOString, toCurrencyString} from "../../utils/util";
import {TfiMore} from "react-icons/tfi";
import {AddIcon, DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {openModal} from "../../redux/slice/modal-slice";
import {askForDelete} from "../../redux/slice/delete-modal-slice";
import {GiTwoCoins} from "react-icons/gi";
import {
    ScheduledExpenseResponse,
    SingleExpenseResponse,
    useReadSingleExpenseQuery,
} from "../../redux/generated/redux-api";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {SingleExpenseItem} from "./SingleExpenseItem";
import {GroupExpenseItemStatus} from "./GroupExpenseItemStatus";

interface Props {
    expense: ScheduledExpenseResponse
}

export const GroupExpenseItem = (props: Props) => {
    const {expense} = props

    const {value: currentMonthStr, month, year} = useAppSelector(state => state.currentDate)

    const now = new Date()
    const todayMonth = now.getUTCMonth() + 1
    const todayYear = now.getUTCFullYear()
    const isCurrentMonthSameAsToday = year === todayYear && month === todayMonth
    const isCurrentMonthOlderThanToday = year < todayYear || (year === todayYear && month < todayMonth)

    const dispatch = useAppDispatch()

    const {
        data: singleExpensesList
    } = useReadSingleExpenseQuery({month: currentMonthStr})

    return (
        <>
            <Flex
                alignItems={"center"}
                justifyContent={"flex-start"}
                pl={2}
                py={2}
                shadow={"2xl"}
            >
                <GroupExpenseItemStatus expense={expense}/>
                <Flex
                    pl={2}
                    flexDirection={"column"}
                    alignItems={"flex-start"}
                >
                    <Text fontWeight={"bold"}>{expense.name}</Text>
                    <Text>{toCurrencyString(expense.spentSum)}</Text>
                    <Text fontWeight={"hairline"}>
                        {getAmountString(expense.amount)}
                    </Text>
                </Flex>
                <Spacer/>
                <Menu>
                    <MenuButton
                        as={IconButton}
                        variant={'outline'}
                        icon={<TfiMore/>}
                        size={"sm"}
                        mr={4}
                    />
                    <MenuList>
                        <MenuItem
                            icon={<AddIcon/>}
                            onClick={() => dispatch(openModal({
                                    modal: "SINGLE_EXPENSE",
                                    value: {
                                        parentExpense: expense.id,
                                        date: isCurrentMonthSameAsToday
                                            ? getCurrentDateISOString()
                                            : new Date(`${currentMonthStr}-${isCurrentMonthOlderThanToday ? getDaysInMonth(year, month).toString() : '01'}`).toISOString().split("T")[0],
                                        tags: expense.tags.map(t => t.id)
                                    }
                                })
                            )}
                        >
                            Add
                        </MenuItem>
                        <MenuItem
                            icon={<EditIcon/>}
                            onClick={() => dispatch(openModal({
                                    modal: "SCHEDULED_EXPENSE",
                                    id: expense.id,
                                    value: {
                                        ...expense,
                                        tags: expense.tags.map(tag => tag.id),
                                    }
                                })
                            )}
                        >
                            Edit
                        </MenuItem>
                        <MenuItem
                            icon={<DeleteIcon/>}
                            onClick={() => {
                                dispatch(askForDelete({
                                    type: "SCHEDULED_EXPENSE",
                                    id: expense.id,
                                    name: expense.name,
                                }))
                            }}
                        >
                            Delete
                        </MenuItem>
                        {
                            expense.amount.type === "CONSTANT" &&
                            <>
                                <MenuDivider/>
                                <MenuItem
                                    icon={<GiTwoCoins/>}
                                    onClick={() => {
                                        dispatch(openModal({
                                            modal: "SINGLE_EXPENSE",
                                            value: {
                                                parentExpense: expense.id,
                                                amount: expense.amount.data.value,
                                                name: expense.name,
                                                date: getCurrentDateISOString()
                                            }
                                        }))
                                    }}
                                >
                                    Create current expense
                                </MenuItem>
                            </>
                        }
                    </MenuList>
                </Menu>
            </Flex>
            {
                singleExpensesList
                    ?.filter((singleExpense) => singleExpense.parentExpense?.id === expense.id)
                    ?.sort((o1, o2) => new Date(o1.date).getTime() - new Date(o2.date).getTime())
                    ?.map((singleExpense: SingleExpenseResponse, index) => {
                        return (
                            <Box px={2} key={`no_parent_expense_item_${index}`}>
                                {index !== 0 && <Divider/>}
                                <SingleExpenseItem expense={singleExpense}/>
                            </Box>
                        )
                    })
            }
        </>
    );
};


function getDaysInMonth(year: number, month: number) {
    return new Date(year, month, 0).getDate();
}