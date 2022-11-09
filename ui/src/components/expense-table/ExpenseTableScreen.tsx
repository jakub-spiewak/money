import {Button, Center, HStack} from "@chakra-ui/react";
import {theme} from "../../theme";
import {CurrentDateComponent} from "../util/CurrentDateComponent";
import {useAppDispatch} from "../../redux/hooks";
import {openModal} from "../../redux/slice/modal-slice";
import {ExpenseTableScreenNavigation} from "./ExpenseTableScreenNavigation";
import {ScheduledExpenseTable} from "./scheduled/ScheduledExpenseTable";
import {SingleExpenseTable} from "./single/SingleExpenseTable";

export const ExpenseTableScreen = () => {
    const dispatch = useAppDispatch()

    return (
        <>
            <ExpenseTableScreenNavigation/>
            <CurrentDateComponent/>
            <Center
                flexDirection={'column'}
                gap={8}
                pt={8}
            >
                <ScheduledExpenseTable/>
                <SingleExpenseTable/>
                <HStack
                    flexDirection={"row"}
                    justifyContent={"end"}
                    minW={["100vw", null, null, theme.breakpoints.lg]}
                >
                    <Button onClick={() => dispatch(openModal({modal: "SCHEDULED_EXPENSE"}))}>
                        Add scheduled
                    </Button>
                    <Button onClick={() => dispatch(openModal({modal: "SINGLE_EXPENSE"}))}>
                        Add single
                    </Button>
                </HStack>
            </Center>
        </>
    )
}