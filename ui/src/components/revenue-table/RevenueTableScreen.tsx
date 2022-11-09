import {CurrentDateComponent} from "../util/CurrentDateComponent";
import {Center} from "@chakra-ui/react";
import {SingleRevenueTable} from "./single/SingleRevenueTable";
import {ScheduledRevenueTable} from "./scheduled/ScheduledRevenueTable";
import {GlobalScreenNavigation} from "../util/GlobalScreenNavigation";

export const RevenueTableScreen = () => {
    return (
        <>
            {/*<RevenueTableScreenNavigation/>*/}
            <GlobalScreenNavigation/>
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