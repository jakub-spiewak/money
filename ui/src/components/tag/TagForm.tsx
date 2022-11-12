import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useToast,
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
    const toast = useToast()

    const [createTag, createResult] = useCreateTagMutation()
    const [updateTag, updateResult] = useUpdateTagMutation()

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
        if (createResult?.isSuccess) {
            toast({
                title: 'Success!',
                description: `An tag has been created.`,
                status: "success",
                position: "top"
            })
        }
    }, [toast, createResult])

    useEffect(() => {
        if (updateResult?.isSuccess) {
            toast({
                title: 'Success!',
                description: `An tag has been updated.`,
                status: "success",
                position: "top"
            })
        }
    }, [toast, updateResult])


    useEffect(() => {
        if (isOpen) reset(value || {name: undefined})
    }, [reset, value, isOpen])

    return (
        <Modal
            isOpen={isOpen}
            onClose={close}
        >
            <ModalOverlay backdropFilter={"blur(3px)"}/>
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