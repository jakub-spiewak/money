import {Button, Spinner} from "@chakra-ui/react";
import {Control} from "react-hook-form";

interface Props {
    isLoading?: boolean,
    control?: Control
}

export const SubmitButton = (props: Props) => {
    const {isLoading, control} = props

    return (
        <Button
            colorScheme='blue'
            mr={3}
            isLoading={isLoading}
            type='submit'
        >
            {isLoading || control?._formState.isSubmitting ? <Spinner/> : "Save"}
        </Button>
    )

}