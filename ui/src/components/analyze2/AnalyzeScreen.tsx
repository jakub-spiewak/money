import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {
    ScheduledExpenseResponse,
    SingleExpenseResponse,
    useReadScheduledExpenseQuery,
    useReadSingleExpenseQuery,
    useSummaryQuery
} from "../../redux/generated/redux-api";
import {
    Box,
    Divider,
    Flex,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    Text
} from "@chakra-ui/react";
import {Doughnut} from "react-chartjs-2";
import {SmallPercentageChart} from "../util/chart/SmallPercentageChart";
import {AmountTableCell} from "../util/table/AmountTableCell";
import {toCurrencyString} from "../../utils/util";
import {AddIcon, DeleteIcon, EditIcon, MinusIcon} from "@chakra-ui/icons";
import {AiOutlineSetting} from "react-icons/ai";
import {BiHome} from "react-icons/bi";
import {GiTakeMyMoney} from "react-icons/gi";
import {TfiMore, TfiStatsUp} from "react-icons/tfi";
import {decrement, increment} from "../../redux/slice/current-date-slice";
import {openModal} from "../../redux/slice/modal-slice";
import {askForDelete} from "../../redux/slice/delete-modal-slice";

const chartColors = [
    "#fd7f6f",
    "#7eb0d5",
    "#b2e061",
    "#bd7ebe",
    "#ffb55a",
    "#ffee65",
    "#beb9db",
    "#fdcce5",
    "#8bd3c7"
]

const getColor = (index: number) => chartColors[index % chartColors.length]

export const AnalyzeScreen = () => {
    const {year, month} = useAppSelector(state => state.currentDate)
    const dispatch = useAppDispatch()

    const currentMonthStr = `${year}-${month <= 9 ? `0${month}` : month}`

    const {data} = useSummaryQuery({month: currentMonthStr})

    const reamingNum = data?.reaming || 0
    const budgetNum = data?.budget || 0

    const reamingPercentage = (data?.normalizedReaming || 0) * 100
    const spentPercentage = (data?.normalizedSpent || 0) * 100

    const {
        data: scheduledExpensesList,
    } = useReadScheduledExpenseQuery({month: currentMonthStr})

    const {
        data: singleExpensesList
    } = useReadSingleExpenseQuery({month: currentMonthStr})

    return (
        <Box>
            <Box
                shadow={"2xl"}
                pb={8}
            >
                <Box
                    position={"relative"}
                    maxW={"32em"}
                    p={8}
                >
                    <Doughnut
                        data={{
                            datasets: [{
                                data: [spentPercentage, reamingPercentage],
                                backgroundColor: [getColor(0), getColor(1)],
                                borderRadius: 16,
                                borderWidth: 4,
                            }]
                        }}
                        options={{
                            responsive: true,
                            spacing: 16,
                            cutout: 96
                        }}
                    />
                    <Box
                        p={4}
                        position={"absolute"}
                        top={"50%"}
                        left={"50%"}
                        transform={"translate(-50%, -50%)"}
                        textAlign={"center"}
                    >
                        <Text
                            fontSize={"md"}
                            fontWeight={"thin"}
                        >
                            Reaming
                        </Text>
                        <Text
                            fontSize={"3xl"}
                            fontWeight={"extrabold"}
                            lineHeight={"1.2em"}
                        >
                            {toCurrencyString(reamingNum)}
                        </Text>
                        <Text
                            fontSize={"md"}
                            fontWeight={"thin"}
                        >
                            from
                        </Text>
                        <Text
                            fontSize={"md"}
                            fontWeight={"thin"}
                        >
                            {toCurrencyString(budgetNum, true)}
                        </Text>
                    </Box>
                </Box>
                <Flex
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    p={4}
                    borderWidth={1}
                    borderRadius={16}
                    mx={8}
                >
                    <IconButton
                        aria-label={"minus"}
                        icon={<MinusIcon/>}
                        onClick={() => {
                            dispatch(decrement())
                        }}
                    />
                    <Text>{currentMonthStr}</Text>
                    <IconButton
                        aria-label={"minus"}
                        icon={<AddIcon/>}
                        onClick={() => {
                            dispatch(increment())
                        }}
                    />
                </Flex>
            </Box>
            <Box py={8}>
                <Flex
                    className={"bg-red"}
                    px={4}
                    justifyContent={"space-between"}
                    fontSize={"2em"}
                >
                    <IconButton
                        aria-label={""}
                        icon={<BiHome/>}
                        variant={'ghost'}
                        fontSize={"1.1em"}
                    />
                    <IconButton
                        aria-label={""}
                        icon={<TfiStatsUp/>}
                        variant={'ghost'}
                        fontSize={"1.1em"}
                    />
                    <IconButton
                        aria-label={""}
                        icon={<AddIcon/>}
                        size={'lg'}
                        shadow={"2xl"}
                        onClick={() => dispatch(openModal({modal: "SINGLE_EXPENSE"}))}
                    />
                    <IconButton
                        aria-label={""}
                        icon={<GiTakeMyMoney/>}
                        variant={'ghost'}
                        fontSize={"1.1em"}
                    />
                    <IconButton
                        aria-label={""}
                        icon={<AiOutlineSetting/>}
                        variant={'ghost'}
                        fontSize={"1.1em"}
                    />
                </Flex>
            </Box>
            <Box
                px={4}
                pb={4}
                className={""}
            >
                <List className={"bg-red-"}>
                    {
                        scheduledExpensesList?.map((scheduledExpense: ScheduledExpenseResponse) => {
                            return (
                                <>
                                    <ListItem
                                        borderWidth={1}
                                        borderRadius={16}
                                        shadow={"xl"}
                                        mb={2}
                                    >
                                        <Flex
                                            alignItems={"center"}
                                            justifyContent={"flex-start"}
                                            py={2}
                                            pl={2}
                                        >
                                            <SmallPercentageChart value={(scheduledExpense.spentFactor || 0) * 100}/>
                                            <Flex
                                                pl={2}
                                                flexDirection={"column"}
                                            >
                                                <Text fontWeight={"bold"}>{scheduledExpense.name}</Text>
                                                <Text>{toCurrencyString(scheduledExpense.spentSum)}</Text>
                                                <Text fontWeight={"hairline"}>
                                                    <AmountTableCell amount={scheduledExpense.amount}/>
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
                                                                    parentExpense: scheduledExpense.id
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
                                                                id: scheduledExpense.id,
                                                                value: {
                                                                    ...scheduledExpense,
                                                                    tags: scheduledExpense.tags.map(tag => tag.id),
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
                                                                id: scheduledExpense.id,
                                                                name: scheduledExpense.name,
                                                            }))
                                                        }}
                                                    >
                                                        Delete
                                                    </MenuItem>
                                                </MenuList>
                                            </Menu>
                                        </Flex>
                                        {
                                            singleExpensesList
                                                ?.filter((singleExpense) => singleExpense.parentExpense?.id === scheduledExpense.id)
                                                ?.sort((o1, o2) => new Date(o1.date).getTime() - new Date(o2.date).getTime())
                                                ?.map((singleExpense: SingleExpenseResponse) => {
                                                    return (
                                                        <Box px={2}>
                                                            <Divider/>
                                                            <Flex
                                                                alignItems={"center"}
                                                                gap={2}
                                                                p={2}
                                                            >
                                                                <Flex
                                                                    gap={2}
                                                                    w={"full"}
                                                                >
                                                                    <Text fontWeight={"bold"}>
                                                                        {singleExpense.name}
                                                                    </Text>
                                                                    <Spacer/>
                                                                    <Text>
                                                                        {toCurrencyString(singleExpense.amount)}
                                                                    </Text>
                                                                </Flex>
                                                                <Menu>
                                                                    <MenuButton
                                                                        as={IconButton}
                                                                        variant={'outline'}
                                                                        icon={<TfiMore/>}
                                                                        size={"sm"}
                                                                    />
                                                                    <MenuList>
                                                                        <MenuItem
                                                                            icon={<EditIcon/>}
                                                                            onClick={() => {
                                                                                dispatch(openModal({
                                                                                    modal: "SINGLE_EXPENSE",
                                                                                    id: singleExpense.id,
                                                                                    value: {
                                                                                        ...singleExpense,
                                                                                        parentExpense: singleExpense.parentExpense?.id,
                                                                                        tags: singleExpense.tags.map(tag => tag.id)
                                                                                    }
                                                                                }))
                                                                            }}
                                                                        >
                                                                            Edit
                                                                        </MenuItem>
                                                                        <MenuItem
                                                                            icon={<DeleteIcon/>}
                                                                            onClick={() => {
                                                                                dispatch(askForDelete({
                                                                                    type: "SINGLE_EXPENSE",
                                                                                    id: singleExpense.id,
                                                                                    name: singleExpense.name,
                                                                                }))
                                                                            }}
                                                                        >
                                                                            Delete
                                                                        </MenuItem>
                                                                    </MenuList>
                                                                </Menu>
                                                            </Flex>
                                                        </Box>
                                                    )
                                                })
                                        }
                                    </ListItem>
                                </>
                            )
                        })
                    }
                </List>
            </Box>
        </Box>
    )
}