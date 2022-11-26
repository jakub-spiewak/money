import {Box, Flex} from "@chakra-ui/react";
import {CurrentDateComponent} from "../util/CurrentDateComponent";
import {ScheduledExpenseTable} from "./scheduled/ScheduledExpenseTable";
import {SingleExpenseTable} from "./single/SingleExpenseTable";

const ExpenseTableScreen = () => {
    return (
        <Box p={4}>
            <CurrentDateComponent/>
            <Flex
                flexDirection={'column'}
                gap={4}
                pt={4}
            >
                <ScheduledExpenseTable/>
                <SingleExpenseTable/>
            </Flex>
        </Box>
    )
}

export default ExpenseTableScreen