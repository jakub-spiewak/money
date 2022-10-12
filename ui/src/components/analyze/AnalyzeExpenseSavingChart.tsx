import {Box} from "@chakra-ui/react";
import {Doughnut} from "react-chartjs-2";
import {theme} from "../../theme";

interface Props {
    expensesAmount: number,
    savingAmount: number
}

export const AnalyzeExpenseSavingChart = (props: Props) => {
    const {expensesAmount, savingAmount} = props

    return (
        <Box
            width={'100%'}
            maxW={theme.breakpoints.sm}
            flex={1}
        >
            <Doughnut
                data={{
                    labels: ["Expense", "Savings"],
                    datasets: [{
                        data: [expensesAmount, savingAmount],
                        backgroundColor: ["#0bb4ff", "#50e991"],
                        hoverOffset: 32,
                        borderJoinStyle: "round"
                    }]
                }}
                options={{
                    layout: {
                        padding: 32,
                    },
                    responsive: true
                }}
            />
        </Box>
    )
}