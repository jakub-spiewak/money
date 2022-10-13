import {Pie} from "react-chartjs-2"
import {ExpenseResponse} from "../../redux/generated/redux-api";
import {Box} from "@chakra-ui/react";

interface Props {
    expenses: ExpenseResponse[]
}

const chartColors = ["#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"]
const getColor = (index: number) => chartColors[index % chartColors.length]

export const AnalyzeExpenseChart = (props: Props) => {
    const {expenses} = props

    const labels = expenses.map((expense) => expense.name)
    const data = expenses.map((expense) => expense.amount)
    const backgroundColor = expenses.map((_, index) => getColor(index))

    return (
        <Box
            width={'100%'}
            maxW={[null, null, "4xl"]}
            maxH={"100vh"}
            height={["50vh", "100vh", "50vh"]}
            mx={"auto"}
        >
            <Pie
                data={{
                    labels,
                    datasets: [{
                        data,
                        backgroundColor,
                        hoverOffset: 16,
                        borderJoinStyle: "round",
                        offset: 4,
                    }],
                }}
                options={{
                    layout: {
                        padding: 8,
                        autoPadding: true,
                    },
                    normalized: true,
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: "chartArea",
                            align: "start",
                            fullSize: false
                        }
                    }
                }}
            />
        </Box>
    )
}