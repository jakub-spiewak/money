import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {
    ScheduledExpenseResponse,
    SingleExpenseResponse,
    useReadScheduledExpenseQuery,
    useReadSingleExpenseQuery,
    useSummaryQuery
} from "../../redux/generated/redux-api";
import {Box, Divider, List, ListItem, Text} from "@chakra-ui/react";
import {Doughnut} from "react-chartjs-2";
import {toCurrencyString} from "../../utils/util";
import {GroupExpenseItem} from "./GroupExpenseItem";
import {ExpenseScreenNavigation} from "./ExpenseScreenNavigation";
import {CurrentDateComponent} from "../util/CurrentDateComponent";
import {SingleExpenseItem} from "./SingleExpenseItem";

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
        data: singleExpensesList,
    } = useReadSingleExpenseQuery({month: currentMonthStr})

    return (
        <Box>
            <Box>
                <ExpenseScreenNavigation/>
                <CurrentDateComponent/>
                <Box
                    position={"relative"}
                    maxW={"32em"}
                    px={8}
                    mb={8}
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
            </Box>
            <Box
                px={4}
                pb={4}
                className={""}
            >
                <List>
                    {
                        scheduledExpensesList?.map((scheduledExpense: ScheduledExpenseResponse) => {
                            return (
                                <ListItem dropShadow={"2xl"}>
                                    <GroupExpenseItem expense={scheduledExpense}/>
                                </ListItem>
                            )
                        })
                    }
                    {
                        singleExpensesList
                            ?.filter((singleExpense) => !singleExpense.parentExpense)
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
                </List>
            </Box>
        </Box>
    )
}

