import {CurrentDateComponent} from "../util/CurrentDateComponent";
import {SingleRevenueTable} from "./single/SingleRevenueTable";
import {ScheduledRevenueTable} from "./scheduled/ScheduledRevenueTable";
import {Flex} from "@chakra-ui/react";

export const RevenueTableScreen = () => {
    return (
        <>
            <CurrentDateComponent/>
            <Flex
                flexDirection={'column'}
                gap={4}
            >
                <ScheduledRevenueTable/>
                <SingleRevenueTable/>
            </Flex>
        </>
    )
}