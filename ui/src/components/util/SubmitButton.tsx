import {Button, Spinner} from "@chakra-ui/react";

interface Props {
    isLoading?: boolean
}

export const SubmitButton = (props: Props) => {
    const {isLoading} = props
    return (
        <Button
            colorScheme='blue'
            mr={3}
            isLoading={isLoading}
            type='submit'
        >
            {isLoading ? <Spinner/> : "Save"}
        </Button>
    )
}