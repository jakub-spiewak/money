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
import {TagRequest, useCreateTagMutation, useUpdateTagMutation} from "../../redux/generated/redux-api";
import {SubmitButton} from "../util/controller/SubmitButton";
import {NameField} from "../util/fields/NameField";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {sanitizeFormValues} from "../../utils/util";
import {closeModal} from "../../redux/slice/modal-slice";

export const TagForm = () => {
    const {isOpen, value, id} = useAppSelector(state => state.modal.TAG)
    const dispatch = useAppDispatch()

    const [createTag] = useCreateTagMutation()
    const [updateTag] = useUpdateTagMutation()

    const {
        handleSubmit,
        control,
        formState: {isSubmitting},
        reset
    } = useForm<TagRequest>()

    const close = () => {
        dispatch(closeModal("TAG"))
    }

    const onSubmit = async (tag: TagRequest) => {
        const request = sanitizeFormValues(tag)
        if (id) await updateTag({id, tagRequest: request})
        else await createTag({tagRequest: request})
        close()
    }

    useEffect(() => {
        if (isOpen) reset(value || {name: undefined})
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