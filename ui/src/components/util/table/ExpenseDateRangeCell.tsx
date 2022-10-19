import {DateRange} from "../../../redux/generated/redux-api";
import {Center, Grid, Text} from "@chakra-ui/react";
import {GiInfinity} from "react-icons/gi";

interface Props {
    date?: DateRange
}

export const ExpenseDateRangeCell = (props: Props) => {
    const {date} = props

    if (!date?.from && !date?.to) return (
        <Center>
            <GiInfinity/>
        </Center>
    )

    return (
        <Grid
            gap={2}
            templateColumns={"min-content min-content"}
        >
            <Text as={"b"}>From:</Text>
            <Text>{date.from ? new Date(date.from).toLocaleDateString() : <GiInfinity/>}</Text>
            <Text as={"b"}>To:</Text>
            <Text>{date.to ? new Date(date.to).toLocaleDateString() : <GiInfinity/>}</Text>
        </Grid>
    )
}