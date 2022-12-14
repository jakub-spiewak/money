import {useAppSelector} from "../../redux/hooks";
import {ScheduledRevenueResponse, useReadScheduledRevenueQuery} from "../../redux/generated/redux-api";
import {Box, Flex, Heading, Image, Spacer, Spinner, Text} from "@chakra-ui/react";
import {GroupRevenueItem} from "./GroupRevenueItem";
import {CurrentDateComponent} from "../util/CurrentDateComponent";
import {DynamicGrid} from "../util/dynamic-grid/DynamicGrid";

const RevenueScreen = () => {
    const month = useAppSelector(state => state.currentDate.value)
    console.log(month)
    const {
        data,
        isFetching
    } = useReadScheduledRevenueQuery({month})

    const dataExists = (data && data.length > 0)

    return (
        <Box p={4}>
            <CurrentDateComponent/>
            <Flex
                p={4}
                backgroundColor={"gray.900"}
                borderRadius={16}
                borderWidth={1}
                alignItems={"center"}
                my={4}
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
                pb={4}
                w={'full'}
            >
                {
                    !dataExists && !isFetching &&
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
                <DynamicGrid>
                    {
                        data?.map((scheduledRevenue: ScheduledRevenueResponse, index) => {
                            return (
                                <GroupRevenueItem key={`group_revenue_item_${index}`} revenue={scheduledRevenue}/>
                            )
                        })
                    }
                </DynamicGrid>
            </Box>
        </Box>
    )
}

export default RevenueScreen;