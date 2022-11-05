import {Button, Center, HStack} from "@chakra-ui/react";
import {ScheduledExpense} from "./scheduled/ScheduledExpense";
import {SingleExpense} from "./single/SingleExpense";
import {theme} from "../../theme";
import {CurrentDateComponent} from "../util/CurrentDateComponent";
import {useState} from "react";
import {useAppDispatch} from "../../redux/hooks";
import {openModal} from "../../redux/slice/modal-slice";
import {ExpenseTableScreenNavigation} from "./ExpenseTableScreenNavigation";

export const ExpenseTableScreen = () => {
    const dispatch = useAppDispatch()
    const [currentExpense, setCurrentExpense] = useState<string>()

    return (
        <>
            <CurrentDateComponent/>
            <ExpenseTableScreenNavigation/>
            <Center
                flexDirection={'column'}
                gap={8}
                pt={8}
            >
                <ScheduledExpense
                    currentExpense={currentExpense}
                />
                <SingleExpense
                    onExpenseClick={setCurrentExpense}
                />
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