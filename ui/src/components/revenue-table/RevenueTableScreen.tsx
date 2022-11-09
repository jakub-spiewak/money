import {CurrentDateComponent} from "../util/CurrentDateComponent";
import {Center} from "@chakra-ui/react";
import {RevenueTableScreenNavigation} from "./RevenueTableScreenNavigation";
import {SingleRevenueTable} from "./single/SingleRevenueTable";
import {ScheduledRevenueTable} from "./scheduled/ScheduledRevenueTable";

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
                <ScheduledRevenueTable/>
                <SingleRevenueTable/>
            </Center>
        </>
    )
}