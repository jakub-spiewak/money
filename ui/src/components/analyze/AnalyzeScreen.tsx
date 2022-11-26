import 'chart.js/auto';
import {useAnalyzeScheduledQuery, useReadScheduledExpenseQuery} from "../../redux/generated/redux-api";
import {AnalyzeTagTable} from "./AnalyzeTagTable";
import {AnalyzeScreenHeadings} from "./AnalyzeScreenHeadings";
import {AnalyzeExpenseChart} from "./AnalyzeExpensesChart";
import {Box, Flex, Heading, Image, Text} from "@chakra-ui/react";
import {CurrentDateComponent} from "../util/CurrentDateComponent";
import {useAppSelector} from "../../redux/hooks";
import {AnalyzeExpenseSavingChart} from "./AnalyzeExpenseSavingChart";

const AnalyzeScreen = () => {

    const month = useAppSelector(state => state.currentDate.value)
    const {data} = useAnalyzeScheduledQuery({month})
    console.log(data)
    const {data: expenses = []} = useReadScheduledExpenseQuery({})

    if (!data) return null

    const {
        tags = [],
        expensesAmountSum = 0,
        revenueAmountSum = 0,
        savingAmountSum = 0,
        expensesFactor = 0,
        savingFactor = 0
    } = data

    const dataExists = !!data && tags.length > 0

    return (
        <>
            <Box p={4}>
                <CurrentDateComponent/>
            </Box>
            {
                !dataExists &&
                <Box px={6}>
                    <Box p={8}>
                        <Image src={"/undraw/moonlight.svg"}/>
                    </Box>
                    <Heading>No data</Heading>
                    <Text
                        fontSize={"2xl"}
                        fontWeight={"hairline"}
                    >
                        Add new tags, expenses and revenues
                    </Text>
                </Box>
            }
            {
                dataExists &&
                <Flex justifyContent={"center"} flexDirection={["column", null, "row"]}>
                    <AnalyzeScreenHeadings
                        revenueAmount={revenueAmountSum}
                        expensesAmount={expensesAmountSum}
                        savingAmount={savingAmountSum}
                        expensesPercentage={expensesFactor}
                        savingPercentage={savingFactor}
                    />
                    <AnalyzeExpenseSavingChart
                        expensesAmount={expensesAmountSum}
                        savingAmount={savingAmountSum}
                    />
                </Flex>
            }
            {
                dataExists && <Flex flexDirection={"column"} p={4} gap={4}>
                    <AnalyzeTagTable tags={tags}/>
                    <AnalyzeExpenseChart expenses={expenses}/>
                </Flex>
            }
        </>
    )
}

export default AnalyzeScreen;