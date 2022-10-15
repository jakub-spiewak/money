import {PersonResponse} from "../../../redux/generated/redux-api";
import {AiOutlineHome} from "react-icons/ai";
import {Center, Text} from "@chakra-ui/react";

interface Props {
    person?: PersonResponse
}

export const visualizePerson = (person?: PersonResponse) => (person ? `${person.firstName} ${person.lastName}` :
    <AiOutlineHome/>)


export const PersonTableCell = (props: Props) => {
    const {person} = props

    if (!person) return (
        <Center>
            <AiOutlineHome/>
        </Center>
    )

    return (<Text>{`${person.firstName} ${person.lastName}`}</Text>)
}