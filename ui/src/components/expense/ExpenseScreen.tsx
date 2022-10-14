import {Center} from "@chakra-ui/react";
import {ScheduledExpense} from "./scheduled/ScheduledExpense";
import {SingleExpense} from "./single/SingleExpense";

export const ExpenseScreen = () => {

    return (
        <Center
            flexDirection={'column'}
            gap={8}
        >
            <ScheduledExpense/>
            <SingleExpense/>
        </Center>
    )
}