import {Center, Spinner, Td, Tr} from "@chakra-ui/react"

interface Props {
    size: number
}

export const LoadingDataTable = (props: Props) => {
    const {size} = props

    return (
        <Tr>
            <Td colSpan={size}>
                <Center>
                    <Spinner
                        size={'xl'}
                    />
                </Center>
            </Td>
        </Tr>
    )
}