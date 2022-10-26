import {SingleRevenueParentResponse} from "../../../redux/generated/redux-api";
import {Center, Text} from "@chakra-ui/react";
import {BsCalendar4Event} from "react-icons/bs";

interface Props {
    revenue?: SingleRevenueParentResponse
}

export const RevenueParentTableCell = (props: Props) => {
    const {revenue} = props

    if (!revenue) return (
        <Center>
            <BsCalendar4Event/>
        </Center>
    )

    return (<Text>{`${revenue.name}`}</Text>)
}