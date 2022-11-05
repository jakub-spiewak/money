import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {ScheduledRevenueResponse, useReadScheduledRevenueQuery} from "../../redux/generated/redux-api";
import {Box, List, ListItem} from "@chakra-ui/react";
import {GroupRevenueItem} from "./GroupRevenueItem";
import {RevenueScreenNavigation} from "./RevenueScreenNavigation";
import {CurrentDateComponent} from "../util/CurrentDateComponent";

const chartColors = [
    "#fd7f6f",
    "#7eb0d5",
    "#b2e061",
    "#bd7ebe",
    "#ffb55a",
    "#ffee65",
    "#beb9db",
    "#fdcce5",
    "#8bd3c7"
]

const getColor = (index: number) => chartColors[index % chartColors.length]

export const RevenueScreen = () => {
    const {year, month} = useAppSelector(state => state.currentDate)
    const dispatch = useAppDispatch()

    const currentMonthStr = `${year}-${month <= 9 ? `0${month}` : month}`

    const {
        data: scheduledRevenuesList,
    } = useReadScheduledRevenueQuery({month: currentMonthStr})

    return (
        <Box>
            <CurrentDateComponent/>
            <RevenueScreenNavigation/>
            <Box
                px={4}
                pb={4}
                className={""}
            >
                <List>
                    {
                        scheduledRevenuesList?.map((scheduledRevenue: ScheduledRevenueResponse) => {
                            return (
                                <ListItem dropShadow={"2xl"}>
                                    <GroupRevenueItem revenue={scheduledRevenue}/>
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Box>
        </Box>
    )
}

