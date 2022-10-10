import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {SubmitButton} from "../util/SubmitButton";
import {PersonRequest} from "../../redux/generated/redux-api";
import {FormModalValueType} from "../../utils/Hooks";

interface Props {
    value?: FormModalValueType<PersonRequest>,
    isOpen: boolean,
    onClose: () => void,
    onSubmit: (person: PersonRequest) => Promise<void>,
}

export const PersonForm = (props: Props) => {
    const {value, isOpen, onClose, onSubmit: onSubmitFromProps} = props

    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
        reset
    } = useForm<PersonRequest>()

    const onSubmit = async (person: PersonRequest) => {
        await onSubmitFromProps({...person})
        onClose()
    }

    useEffect(() => {
        if (isOpen) reset(value?.request || {firstName: undefined, lastName: undefined})
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
                        <ModalHeader>Add person</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody pb={6}>
                            <FormControl isInvalid={!!errors.firstName}>
                                <FormLabel>First name</FormLabel>
                                <Input
                                    placeholder='First name'
                                    {...register('firstName', {
                                        required: 'This is required',
                                        minLength: {value: 4, message: 'Minimum length should be 4'},
                                        maxLength: {value: 32, message: 'Maximum length should be 32'}
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.firstName && errors.firstName.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl
                                mt={4}
                                isInvalid={!!errors.lastName}
                            >
                                <FormLabel>Last name</FormLabel>
                                <Input
                                    placeholder='Last name'
                                    {...register('lastName', {
                                        required: 'This is required',
                                        minLength: {value: 4, message: 'Minimum length should be 4'},
                                        maxLength: {value: 32, message: 'Maximum length should be 32'}
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.lastName && errors.lastName.message}
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