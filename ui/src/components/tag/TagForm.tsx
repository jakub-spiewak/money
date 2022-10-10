import {
    Box,
    Button, FormControl, FormErrorMessage, FormLabel,
    Input,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {TagType} from "../../utils/CommonTypes";
import {TagRequest} from "../../redux/generated/redux-api";
import {FormModalValueType} from "../../utils/Hooks";
import {SubmitButton} from "../util/SubmitButton";

interface Props {
    value?: FormModalValueType<TagRequest>,
    isOpen: boolean,
    onClose: () => void,
    onSubmit: (tag: TagRequest) => Promise<void>,
}

export const TagForm = (props: Props) => {
    const {value, isOpen, onClose, onSubmit: onSubmitFromProps} = props

    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
        reset
    } = useForm<TagRequest>()

    const onSubmit = async (tag: TagRequest) => {
        await onSubmitFromProps({...tag})
        onClose()
    }

    useEffect(() => {
        if (isOpen) reset(value?.request || {name: undefined})
    }, [reset, value, isOpen])

    return (
        <Box>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay/>
                <ModalContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader>Add tag</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody pb={6}>
                            <FormControl
                                mt={4}
                                isInvalid={!!errors.name}
                            >
                                <FormLabel>Name</FormLabel>
                                <Input
                                    placeholder='Name'
                                    {...register('name', {
                                        required: 'This is required',
                                        minLength: {value: 3, message: 'Minimum length should be 3'},
                                        maxLength: {value: 32, message: 'Maximum length should be 32'}
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <SubmitButton isLoading={isSubmitting}/>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </Box>
    )
}