import {SingleExpenseParentResponse} from "../../../redux/generated/redux-api";
import {Center, Text} from "@chakra-ui/react";
import {BsCalendar4Event} from "react-icons/bs";

interface Props {
    expense?: SingleExpenseParentResponse
}

export const ExpenseParentTableCell = (props: Props) => {
    const {expense} = props

    if (!expense) return (
        <Center>
            <BsCalendar4Event/>
        </Center>
    )

    return (<Text>{`${expense.name}`}</Text>)
}