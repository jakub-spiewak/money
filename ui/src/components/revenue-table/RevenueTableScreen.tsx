import {CurrentDateComponent} from "../util/CurrentDateComponent";
import {SingleRevenueTable} from "./single/SingleRevenueTable";
import {ScheduledRevenueTable} from "./scheduled/ScheduledRevenueTable";
import {Flex} from "@chakra-ui/react";
import {Fragment} from "react";

export const RevenueTableScreen = () => {
    return (
        <Fragment>
            <CurrentDateComponent/>
            <Flex
                flexDirection={'column'}
                gap={4}
            >
                <ScheduledRevenueTable/>
                <SingleRevenueTable/>
            </Flex>
        </Fragment>
    )
}