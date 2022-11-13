import {Button} from "@chakra-ui/react";
import {Control} from "react-hook-form";

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