import {PersonResponse} from "../../redux/generated/redux-api";
import {AiOutlineHome} from "react-icons/ai";
import {Box, Flex} from "@chakra-ui/react";

interface Props {
    person?: PersonResponse
}

export const visualizePerson = (person?: PersonResponse) => (person ? `${person.firstName} ${person.lastName}` : <AiOutlineHome/>)


export const PersonTableCell = (props: Props) => {
    const {person} = props
    return (
        <Flex w={"full"}>
            <Box mx={"auto"}>
                {visualizePerson(person)}
            </Box>
        </Flex>
    )
}