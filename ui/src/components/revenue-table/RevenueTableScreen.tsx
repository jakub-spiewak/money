import {CurrentDateComponent} from "../util/CurrentDateComponent";
import {SingleRevenueTable} from "./single/SingleRevenueTable";
import {ScheduledRevenueTable} from "./scheduled/ScheduledRevenueTable";
import {Box, Flex} from "@chakra-ui/react";

const RevenueTableScreen = () => {
    return (
        <Box p={4}>
            <CurrentDateComponent/>
            <Flex
                flexDirection={'column'}
                gap={4}
                pt={4}
            >
                <ScheduledRevenueTable/>
                <SingleRevenueTable/>
            </Flex>
        </Box>
    )
}

export default RevenueTableScreen;