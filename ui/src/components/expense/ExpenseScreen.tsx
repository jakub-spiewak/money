import {Button, Center, HStack} from "@chakra-ui/react";
import {ScheduledExpense} from "./scheduled/ScheduledExpense";
import {SingleExpense} from "./single/SingleExpense";
import {useFormModalStateType} from "../../utils/Hooks";
import {ScheduledExpenseRequest, SingleExpenseRequest} from "../../redux/generated/redux-api";

export const ExpenseScreen = () => {

    const scheduledExpenseModal = useFormModalStateType<ScheduledExpenseRequest>()
    const singleExpenseModal = useFormModalStateType<SingleExpenseRequest>()

    return (
        <Center
            flexDirection={'column'}
            gap={8}
        >
            <ScheduledExpense modal={scheduledExpenseModal}/>
            <SingleExpense modal={singleExpenseModal}/>
            <HStack
                flexDirection={"row"}
                justifyContent={"end"}
                minW={"50vw"}
                maxW={"100vw"}
            >
                <Button onClick={() => scheduledExpenseModal.open()}>Add scheduled expense</Button>
                <Button onClick={() => singleExpenseModal.open()}>Add single expense</Button>
            </HStack>
        </Center>
    )
}