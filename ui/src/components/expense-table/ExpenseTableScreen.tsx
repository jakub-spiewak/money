import {Flex} from "@chakra-ui/react";
import {CurrentDateComponent} from "../util/CurrentDateComponent";
import {ScheduledExpenseTable} from "./scheduled/ScheduledExpenseTable";
import {SingleExpenseTable} from "./single/SingleExpenseTable";

export const ExpenseTableScreen = () => {
    return (
        <>
            <CurrentDateComponent/>
            <Flex
                flexDirection={'column'}
                pt={8}
                gap={8}
            >
                <ScheduledExpenseTable/>
                <SingleExpenseTable/>
            </Flex>
        </>
    )
}