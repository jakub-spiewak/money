import {Doughnut} from "react-chartjs-2"
import {Amount, ScheduledExpenseResponse} from "../../redux/generated/redux-api";
import {Box} from "@chakra-ui/react";

interface Props {
    expenses: ScheduledExpenseResponse[]
}

const getAmountNumber = (amount?: Amount): number => {
    if (!amount) return 0;

    const {data, type} = amount
    switch (type) {
        case "RANGE":
            return ((data?.min || 0) + (data?.max || 0)) / 2
        case "PERCENTAGE":
            return data?.value || 0
        case "CONSTANT":
            return data?.value || 0
        case "UNKNOWN":
            return 0
        default:
            return 0
    }

}

const chartColors = ["#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"]
const getColor = (index: number) => chartColors[index % chartColors.length]

export const AnalyzeExpenseChart = (props: Props) => {
    const {expenses} = props

    const labels = expenses.map((expense) => expense.name)
    const data = expenses.map((expense) => getAmountNumber(expense.amount))
    const backgroundColor = expenses.map((_, index) => getColor(index))

    return (
        <Box
            width={'100%'}
            maxW={[null, null, "4xl"]}
            maxH={"100vh"}
            height={["50vh", "100vh", "50vh"]}
            mx={"auto"}
        >
            <Doughnut
                data={{
                    labels,
                    datasets: [{
                        data,
                        backgroundColor,
                        hoverOffset: 16,
                        borderJoinStyle: "round",
                        offset: 4,
                        borderRadius: 16,
                        borderWidth: 4,
                    }],
                }}
                options={{
                    spacing: 12,
                    layout: {
                        padding: 8,
                        autoPadding: true,
                    },
                    normalized: true,
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            padding: 16,
                            titleSpacing: 2,
                            boxPadding: 8
                        },
                        legend: {
                            position: "bottom",
                            align: "center",
                            fullSize: true,
                        }
                    }
                }}
            />
        </Box>
    )
}