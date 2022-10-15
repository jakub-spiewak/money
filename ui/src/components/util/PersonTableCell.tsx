import {PersonResponse} from "../../redux/generated/redux-api";
import {AiOutlineHome} from "react-icons/ai";
import {Box, Flex} from "@chakra-ui/react";

interface Props {
    person?: PersonResponse
}

export const PersonTableCell = (props: Props) => {
    const {person} = props
    return (
        <Flex w={"full"}>
            <Box mx={"auto"}>
                {person ? `${person.firstName} ${person.lastName}` : <AiOutlineHome/>}
            </Box>
        </Flex>
    )
}