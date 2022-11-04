import {Box} from "@chakra-ui/react";
import {Doughnut} from "react-chartjs-2";

interface Props {
    value: number,
    backgroundColor?: string,
}

export const SmallPercentageChart = (props: Props) => {
    const {value, backgroundColor} = props
    return (
        <Box
            w={"4em"}
            pb={2}
        >
            <Doughnut
                options={{
                    events: [],
                    plugins: {},
                    cutout: 16,
                    responsive: true
                }}
                data={{
                    datasets: [{
                        data: [value, 100 - value],
                        backgroundColor: [backgroundColor || "white", "transparent"],
                        borderAlign: "center",
                        borderWidth: 1
                    }]
                }}
            />
        </Box>
    );
};