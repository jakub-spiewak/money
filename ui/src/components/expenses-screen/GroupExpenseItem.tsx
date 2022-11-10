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
import {SmallPercentageChart} from "../util/chart/SmallPercentageChart";
import {getCurrentDateISOString, toCurrencyString} from "../../utils/util";
import {AmountTableCell} from "../util/table/AmountTableCell";
import {TfiMore} from "react-icons/tfi";
import {AddIcon, DeleteIcon, EditIcon, Icon} from "@chakra-ui/icons";
import {openModal} from "../../redux/slice/modal-slice";
import {askForDelete} from "../../redux/slice/delete-modal-slice";
import {GiTwoCoins, GiWallet} from "react-icons/gi";
import {
    ScheduledExpenseResponse,
    SingleExpenseResponse,
    useReadSingleExpenseQuery,
} from "../../redux/generated/redux-api";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {SingleExpenseItem} from "./SingleExpenseItem";
import {CiCircleCheck} from "react-icons/ci";
import {IoWarning} from "react-icons/io5";

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
        <Box
            borderWidth={1}
            borderRadius={16}
            mb={2}
        >
            <Flex
                alignItems={"center"}
                shadow={"2xl"}
                justifyContent={"flex-start"}
                py={2}
                pl={2}
                borderRadius={16}
            >
                {
                    (expense.amount.type === "CONSTANT" && expense.spentFactor > 0) &&
                    <Icon
                        as={CiCircleCheck}
                        color={"green.500"}
                        w={16}
                        h={16}
                        px={2}
                    />
                }
                {
                    (expense.amount.type === "CONSTANT" && expense.spentFactor === 0 && isCurrentMonthOlderThanToday) &&
                    <Icon
                        as={IoWarning}
                        w={16}
                        h={16}
                        px={2}
                        color={"red.500"}
                    />
                }
                {
                    (expense.amount.type === "CONSTANT" && expense.spentFactor === 0 && (!isCurrentMonthOlderThanToday || isCurrentMonthSameAsToday)) &&
                    <Icon
                        w={16}
                        h={16}
                        px={2}
                        as={GiWallet}
                        color={"whiteAlpha.400"}
                    />
                }
                {
                    expense.amount.type !== "CONSTANT" &&
                    <SmallPercentageChart
                        value={(expense.spentFactor || 0) * 100}
                        backgroundColor={getSpentFactorColor(expense.spentFactor)}
                    />
                }
                <Flex
                    pl={2}
                    flexDirection={"column"}
                    alignItems={"flex-start"}
                >
                    <Text fontWeight={"bold"}>{expense.name}</Text>
                    <Text>{toCurrencyString(expense.spentSum)}</Text>
                    <Text fontWeight={"hairline"}>
                        <AmountTableCell amount={expense.amount}/>
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
                                            : new Date(`${currentMonthStr}-${isCurrentMonthOlderThanToday ? getDaysInMonth(year, month).toString() : '01'}`).toISOString().split("T")[0]
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
                            <Box px={2}>
                                {index !== 0 && <Divider/>}
                                <SingleExpenseItem expense={singleExpense}/>
                            </Box>
                        )
                    })
            }
        </Box>
    );
};

function getSpentFactorColor(spentFactor: number): string | undefined {
    if (spentFactor < 1) return undefined
    if (spentFactor === 1) return "green"
    if (spentFactor > 1) return "red"
}

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month, 0).getDate();
}