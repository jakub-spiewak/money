import {Button, Center, HStack} from "@chakra-ui/react";
import {ScheduledExpense} from "./scheduled/ScheduledExpense";
import {SingleExpense} from "./single/SingleExpense";
import {useFormModalStateType} from "../../utils/Hooks";
import {ScheduledExpenseRequest, SingleExpenseRequest} from "../../redux/generated/redux-api";
import {theme} from "../../theme";
import {CurrentDateComponent} from "../util/CurrentDateComponent";
import {useState} from "react";

export const ExpenseScreen = () => {

    const scheduledExpenseModal = useFormModalStateType<ScheduledExpenseRequest>()
    const singleExpenseModal = useFormModalStateType<SingleExpenseRequest>()
    const [currentExpense, setCurrentExpense] = useState<string>()

    return (
        <>
            <CurrentDateComponent/>
            <Center
                flexDirection={'column'}
                gap={8}
                pt={8}
            >
                <ScheduledExpense
                    modal={scheduledExpenseModal}
                    currentExpense={currentExpense}
                />
                <SingleExpense
                    modal={singleExpenseModal}
                    onExpenseClick={setCurrentExpense}
                />
                <HStack
                    flexDirection={"row"}
                    justifyContent={"end"}
                    minW={["100vw", null, null, theme.breakpoints.lg]}
                >
                    <Button onClick={() => scheduledExpenseModal.open()}>Add scheduled expense</Button>
                    <Button onClick={() => singleExpenseModal.open()}>Add single expense</Button>
                </HStack>
            </Center>
        </>
    )
}