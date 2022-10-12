import 'chart.js/auto';
import {Flex} from "@chakra-ui/react";
import {useAnalyzeQuery, useReadExpenseQuery} from "../../redux/generated/redux-api";
import {AnalyzeTagTable} from "./AnalyzeTagTable";
import {AnalyzeExpenseSavingChart} from "./AnalyzeExpenseSavingChart";
import {AnalyzeScreenHeadings} from "./AnalyzeScreenHeadings";
import {AnalyzeExpenseChart} from "./AnalyzeExpensesChart";

export const AnalyzeScreen = () => {

    const {data} = useAnalyzeQuery()
    const {data: expenses = []} = useReadExpenseQuery()

    if (!data) return null

    const {
        tags = [],
        expensesAmountSum = 0,
        revenueAmountSum = 0,
        savingAmountSum = 0,
        expensesPart = 0,
        savingPart = 0
    } = data

    return (
        <>
            <AnalyzeScreenHeadings
                revenueAmount={revenueAmountSum}
                expensesAmount={expensesAmountSum}
                savingAmount={savingAmountSum}
                expensesPercentage={expensesPart}
                savingPercentage={savingPart}
            />
            <Flex
                gap={8}
                flexDirection={["column", null, null, null, "row"]}
                alignItems={'center'}
            >
                <AnalyzeExpenseSavingChart
                    expensesAmount={expensesAmountSum}
                    savingAmount={savingAmountSum}
                />
                <AnalyzeTagTable tags={tags}/>
            </Flex>
            <AnalyzeExpenseChart expenses={expenses}/>
        </>
    )
}