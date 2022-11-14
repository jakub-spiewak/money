import {Box} from "@chakra-ui/react";
import {Doughnut} from "react-chartjs-2";
import {jsx} from "@emotion/react";
import JSX = jsx.JSX;

interface Props {
    value: number,
    backgroundColor?: string,
    borderColor?: string,
    inside?: JSX.Element
}

export const SmallPercentageChart = (props: Props) => {
    const {value, backgroundColor, borderColor, inside} = props
    return (
        <Box
            position={"relative"}
            w={"4em"}
            display={"flex"}
        >
            <Doughnut
                options={{
                    offset: 0,
                    events: [],
                    plugins: {},
                    // cutout: 16,
                    responsive: true,
                }}
                data={{
                    datasets: [{
                        data: [value, 100 - value],
                        backgroundColor: [backgroundColor || "white", "transparent"],
                        borderColor,
                        borderWidth: 2
                    }]
                }}
            />
            {
                inside && <Box
                    mt={2}
                    position={"absolute"}
                    top={"50%"}
                    left={"50%"}
                    transform={"translate(-50%, -50%)"}
                >
                    {inside}
                </Box>
            }
        </Box>
    );
};