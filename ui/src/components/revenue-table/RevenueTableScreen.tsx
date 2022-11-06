import {CurrentDateComponent} from "../util/CurrentDateComponent";
import {Center} from "@chakra-ui/react";
import {ScheduledRevenue} from "./scheduled/ScheduledRevenue";
import {SingleRevenue} from "./single/SingleRevenue";
import {RevenueTableScreenNavigation} from "./RevenueTableScreenNavigation";

export const RevenueTableScreen = () => {
    return (
        <>
            <RevenueTableScreenNavigation/>
            <CurrentDateComponent/>
            <Center
                flexDirection={'column'}
                gap={8}
                pt={8}
            >
                <ScheduledRevenue/>
                <SingleRevenue/>
            </Center>
        </>
    )
}