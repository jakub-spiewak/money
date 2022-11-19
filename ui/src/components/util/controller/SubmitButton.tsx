import {Button} from "@chakra-ui/react";

interface Props {
    isLoading?: boolean,
    disabled?: boolean,
}

export const SubmitButton = (props: Props) => {
    const {isLoading, disabled} = props

    return (
        <Button
            colorScheme='blue'
            mr={3}
            isLoading={isLoading}
            disabled={disabled}
            type='submit'
        >
            {"Save"}
        </Button>
    )

}