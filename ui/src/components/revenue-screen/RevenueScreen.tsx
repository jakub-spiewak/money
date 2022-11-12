import {useAppSelector} from "../../redux/hooks";
import {ScheduledRevenueResponse, useReadScheduledRevenueQuery} from "../../redux/generated/redux-api";
import {Box, Flex, Heading, Image, List, ListItem, Spacer, Spinner, Text} from "@chakra-ui/react";
import {GroupRevenueItem} from "./GroupRevenueItem";
import {CurrentDateComponent} from "../util/CurrentDateComponent";

export const RevenueScreen = () => {
    const {year, month} = useAppSelector(state => state.currentDate)

    const currentMonthStr = `${year}-${month <= 9 ? `0${month}` : month}`

    const {
        data,
        isFetching
    } = useReadScheduledRevenueQuery({month: currentMonthStr})

    return (
        <Box>
            <CurrentDateComponent/>
            <Flex
                p={4}
                backgroundColor={"gray.900"}
                borderRadius={16}
                borderWidth={1}
                m={4}
                alignItems={"center"}
            >
                <Text
                    fontSize={"2xl"}
                    fontWeight={"hairline"}
                >
                    Revenues
                </Text>
                <Spacer/>
                {
                    isFetching && <Spinner/>
                }
            </Flex>
            <Box
                px={4}
                pb={4}
                className={""}
            >
                <List>
                    {
                        data && data.length === 0 &&
                        <Box px={2}>
                            <Box p={8}>
                                <Image src={"/undraw/moonlight.svg"}/>
                            </Box>
                            <Heading>No data</Heading>
                            <Text
                                fontSize={"2xl"}
                                fontWeight={"hairline"}
                            >
                                Add revenues with plus button below
                            </Text>
                        </Box>
                    }
                    {
                        data?.map((scheduledRevenue: ScheduledRevenueResponse) => {
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

