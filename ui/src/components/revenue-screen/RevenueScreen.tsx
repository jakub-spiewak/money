import {useAppSelector} from "../../redux/hooks";
import {ScheduledRevenueResponse, useReadScheduledRevenueQuery} from "../../redux/generated/redux-api";
import {Box, List, ListItem, Text} from "@chakra-ui/react";
import {GroupRevenueItem} from "./GroupRevenueItem";
import {CurrentDateComponent} from "../util/CurrentDateComponent";

export const RevenueScreen = () => {
    const {year, month} = useAppSelector(state => state.currentDate)

    const currentMonthStr = `${year}-${month <= 9 ? `0${month}` : month}`

    const {
        data: scheduledRevenuesList,
    } = useReadScheduledRevenueQuery({month: currentMonthStr})

    return (
        <Box>
            <CurrentDateComponent/>
            <Box
                p={4}
                backgroundColor={"gray.900"}
                borderRadius={16}
                borderWidth={1}
                m={4}
            >
                <Text
                    fontSize={"2xl"}
                    fontWeight={"hairline"}
                >
                    Revenues
                </Text>
            </Box>
            <Box
                px={4}
                pb={4}
                className={""}
            >
                <List>
                    {
                        scheduledRevenuesList?.map((scheduledRevenue: ScheduledRevenueResponse) => {
                            return (
                                <ListItem
                                    key={`list_item_${scheduledRevenue.id}`}
                                    dropShadow={"2xl"}
                                >
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

