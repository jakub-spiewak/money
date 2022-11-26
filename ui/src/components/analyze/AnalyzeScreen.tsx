import 'chart.js/auto';
import {useAnalyzeScheduledQuery, useReadScheduledExpenseQuery} from "../../redux/generated/redux-api";
import {AnalyzeTagTable} from "./AnalyzeTagTable";
import {AnalyzeExpenseSavingChart} from "./AnalyzeExpenseSavingChart";
import {AnalyzeScreenHeadings} from "./AnalyzeScreenHeadings";
import {AnalyzeExpenseChart} from "./AnalyzeExpensesChart";
import {Box, Flex} from "@chakra-ui/react";
import {CurrentDateComponent} from "../util/CurrentDateComponent";

const AnalyzeScreen = () => {

    const {data} = useAnalyzeScheduledQuery({})
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

    return (
        <>
            <Box p={4}>
                <CurrentDateComponent/>
            </Box>
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
            <Flex flexDirection={"column"} p={4} gap={4}>
                <AnalyzeTagTable tags={tags}/>
                <AnalyzeExpenseChart expenses={expenses}/>
            </Flex>
        </>
    )
}

export default AnalyzeScreen;