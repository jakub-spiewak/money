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
            p={8}
            mx={"auto"}
        >
            <Doughnut
                data={{
                    labels: ["Expense", "Savings"],
                    datasets: [{
                        data: [expensesAmount, savingAmount],
                        backgroundColor: ["#0bb4ff", "#50e991"],
                        borderRadius: 16,
                        borderWidth: 4,
                    }]
                }}
                options={{
                    responsive: true,
                    spacing: 16,
                    cutout: 96,
                    events: [],
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }}
            />
        </Box>
    )
}