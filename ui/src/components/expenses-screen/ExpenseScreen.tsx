import {useAppSelector} from "../../redux/hooks";
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
    Heading,
    Image,
    List,
    ListItem,
    Spacer,
    Spinner,
    Text,
    useBreakpointValue
} from "@chakra-ui/react";
import {Doughnut} from "react-chartjs-2";
import {toCurrencyString} from "../../utils/util";
import {GroupExpenseItem} from "./GroupExpenseItem";
import {CurrentDateComponent} from "../util/CurrentDateComponent";
import {SingleExpenseItem} from "./SingleExpenseItem";
import {useChunkedArray} from "../../utils/Hooks";
import {jsx} from "@emotion/react";
import JSX = jsx.JSX;

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

export const ExpenseScreen = () => {
    const currentMonthStr = useAppSelector(state => state.currentDate.value)

    const {data, isFetching: isFetchingSummary} = useSummaryQuery({month: currentMonthStr})

    const reamingNum = data?.reaming || 0
    const budgetNum = data?.budget || 0

    const reamingPercentage = (clampToOne(data?.normalizedReaming)) * 100
    const spentPercentage = (clampToOne(data?.normalizedSpent)) * 100

    const {
        data: scheduledExpensesList,
        isFetching: isFetchingScheduledExpenses
    } = useReadScheduledExpenseQuery({month: currentMonthStr})

    const {
        data: singleExpensesList,
        isFetching: isFetchingSingleExpenses
    } = useReadSingleExpenseQuery({month: currentMonthStr})

    const dataExists =
        (scheduledExpensesList && scheduledExpensesList.length > 0) ||
        (singleExpensesList && singleExpensesList.length > 0)

    const isLoading = isFetchingSummary || isFetchingSingleExpenses || isFetchingScheduledExpenses

    // TODO: pls refactor this later
    const columnsNumber = useBreakpointValue({base: 1, md: 2, lg: 3, xl: 4}, {fallback: 'base'}) || 1
    const expensesChunks: ScheduledExpenseResponse[][] = useChunkedArray(scheduledExpensesList || [], columnsNumber);
    const chunksComponents: JSX.Element[][] = expensesChunks.map((chunk) => {
        return chunk.map((scheduledExpense) => {
            return (
                <ListItem mb={4} w={'full'} dropShadow={"2xl"}>
                    <GroupExpenseItem expense={scheduledExpense}/>
                </ListItem>
            )
        })
    })

    chunksComponents[chunksComponents.length - 1].push((
        <Box
            borderWidth={1}
            borderRadius={16}
        >
            {
                singleExpensesList
                    ?.filter((singleExpense) => !singleExpense.parentExpense)
                    ?.sort((o1, o2) => new Date(o1.date).getTime() - new Date(o2.date).getTime())
                    ?.map((singleExpense: SingleExpenseResponse, index) => {
                        return (
                            <Box
                                px={2}
                                borderRadius={16}
                                shadow={"2xl"}
                            >
                                {index !== 0 && <Divider/>}
                                <SingleExpenseItem expense={singleExpense}/>
                            </Box>
                        )
                    })
            }
        </Box>
    ))
    const components: JSX.Element[][] = chunksComponents


    return (
        <Box>
            <CurrentDateComponent/>
            <Box>
                <Flex
                    alignItems={"center"}
                    backgroundColor={"gray.900"}
                    borderRadius={16}
                    borderWidth={1}
                    m={4}
                    p={4}
                >
                    <Text
                        fontSize={"2xl"}
                        fontWeight={"hairline"}
                    >
                        Expenses
                    </Text>
                    <Spacer/>
                    {isLoading && <Spinner/>}
                </Flex>
                {
                    !dataExists && !isLoading &&
                    <Box px={6}>
                        <Box p={8}>
                            <Image src={"/undraw/moonlight.svg"}/>
                        </Box>
                        <Heading>No data</Heading>
                        <Text
                            fontSize={"2xl"}
                            fontWeight={"hairline"}
                        >
                            Add new expenses with plus button below
                        </Text>
                    </Box>
                }
                {
                    dataExists &&
                    <Box
                        maxW={"32em"}
                        mb={8}
                        mx={"auto"}
                        position={"relative"}
                        px={8}
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
                                // cutout: 96,
                                events: []
                            }}
                        />
                        <Box
                            left={"50%"}
                            position={"absolute"}
                            textAlign={"center"}
                            top={"50%"}
                            transform={"translate(-50%, -50%)"}
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
                }
            </Box>
            <Flex
                pb={4}
                gap={4}
                px={4}
                justifyContent={'center'}
            >
                {
                    components.map((chunk) => {
                        return (
                            <List w={'full'}>
                                {
                                    chunk.map((element) => {
                                        return element
                                    })
                                }
                            </List>
                        )
                    })
                }
            </Flex>
        </Box>
    )
}

const clampToOne = (value: number = 0) => {
    return value > 1 ? 1 : value
}