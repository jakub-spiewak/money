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
import {TagRequest} from "../../redux/generated/redux-api";
import {FormModalStateType} from "../../utils/Hooks";
import {SubmitButton} from "../util/form/SubmitButton";
import {NameField} from "../util/fields/NameField";

interface Props {
    state: FormModalStateType<TagRequest>
    onSubmit: (tag: TagRequest) => Promise<void>,
}

export const TagForm = (props: Props) => {
    const {state: {isOpen, close, value}, onSubmit: onSubmitFromProps} = props

    const {
        handleSubmit,
        control,
        formState: {isSubmitting},
        reset
    } = useForm<TagRequest>()

    const onSubmit = async (tag: TagRequest) => {
        await onSubmitFromProps({...tag})
        close()
    }

    useEffect(() => {
        if (isOpen) reset(value?.request || {name: undefined})
    }, [reset, value, isOpen])

    return (
        <Modal
            isOpen={isOpen}
            onClose={close}
        >
            <ModalOverlay/>
            <ModalContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>Add tag</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <NameField control={control}/>
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