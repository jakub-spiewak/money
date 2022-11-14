import {ScheduledExpenseResponse, ScheduledExpenseStatus} from "../../redux/generated/redux-api";
import {Icon} from "@chakra-ui/icons";
import {CiCircleAlert, CiCircleCheck, CiDollar} from "react-icons/ci";
import {SmallPercentageChart} from "../util/chart/SmallPercentageChart";
import {theme} from "../../theme";

interface Props {
    expense: ScheduledExpenseResponse
}

export const GroupExpenseItemStatus = (props: Props) => {
    const {expense: {amount: {type}, status, spentFactor}} = props

    if (type === "CONSTANT" && status === "PAID") {
        return (

            <Icon
                as={CiCircleCheck}
                color={"green.500"}
                w={16}
                h={16}
                px={2}
            />
        )
    }

    if (type === "CONSTANT" && status === "UNPAID") {
        return (
            <Icon
                as={CiCircleAlert}
                w={16}
                h={16}
                px={2}
                color={"red.500"}
            />
        )
    }

    if (type === "CONSTANT" && status === "FUTURE") {
        return (
            <Icon
                w={16}
                h={16}
                px={2}
                as={CiDollar}
                color={"whiteAlpha.300"}
            />
        )
    }

    return (
        <SmallPercentageChart
            value={(spentFactor > 1 ? 1 : spentFactor) * 100}
            backgroundColor={getSpentFactorColor(status)}
        />
    );
};

function getSpentFactorColor(status: ScheduledExpenseStatus): string | undefined {
    switch (status) {
        case "FUTURE":
            break;
        case "PAID":
            break;
        case "UNPAID":
            break;
        case "BELOW_MIN":
            break;
        case "BETWEEN_MIN_MAX":
            return theme.colors.green["500"]
        case "EXCEED_MAX":
            return theme.colors.red["500"]
    }
}

