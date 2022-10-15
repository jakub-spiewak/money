import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {SubmitButton} from "../util/form/SubmitButton";
import {PersonRequest} from "../../redux/generated/redux-api";
import {FormModalStateType} from "../../utils/Hooks";
import {NameField} from "../util/fields/NameField";

interface Props {
    state: FormModalStateType<PersonRequest>
    onSubmit: (person: PersonRequest) => Promise<void>,
}

export const PersonForm = (props: Props) => {
    const {state: {isOpen, value, close}, onSubmit: onSubmitFromProps} = props

    const {
        handleSubmit,
        control,
        formState: {isSubmitting},
        reset
    } = useForm<PersonRequest>()

    const onSubmit = async (person: PersonRequest) => {
        await onSubmitFromProps({...person})
        close()
    }

    useEffect(() => {
        if (isOpen) reset(value?.request || {firstName: undefined, lastName: undefined})
    }, [reset, value, isOpen])

    return (
        <Modal
            isOpen={isOpen}
            onClose={close}
        >
            <ModalOverlay/>
            <ModalContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>Add person</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <NameField
                            name={"firstName"}
                            label={"First name"}
                            control={control}
                        />
                        <NameField
                            name={"lastName"}
                            label={"Last name"}
                            control={control}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <SubmitButton isLoading={isSubmitting}/>
                        <Button onClick={close}>Cancel</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}