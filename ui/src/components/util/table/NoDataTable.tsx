import {Center, Heading, Td, Tr} from "@chakra-ui/react"

interface Props {
    size: number
}

export const NoDataTable = (props: Props) => {
    const {size} = props

    return (
        <Tr>
            <Td colSpan={size}>
                <Center>
                    <Heading size={"md"}>There is no data yet</Heading>
                </Center>
            </Td>
        </Tr>
    )
}