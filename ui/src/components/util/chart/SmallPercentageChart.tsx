import { Box } from "@chakra-ui/react";
import { Doughnut } from "react-chartjs-2";

interface Props {
    value: number
}

export const SmallPercentageChart = (props: Props) => {
    const {value} = props
    return (
        <Box
            w={"4em"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
        >
            <Doughnut
                options={{
                    events: [],
                    plugins: {

                    },
                    cutout: 16
                }}
                data={{
                    datasets: [{
                        data: [value, 100 - value],
                        backgroundColor: ["white", "transparent"],
                        borderWidth: 1,
                    }]
                }}
            />
        </Box>
    );
};