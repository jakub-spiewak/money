import {
    Box,
    Button, FormControl, FormErrorMessage, FormLabel,
    Input,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useEffect} from "react";

interface PersonFormProps {
}

interface PersonFormType {
    firstName: string;
    lastName: string;
}

export const PersonForm = (props: PersonFormProps) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
        reset
    } = useForm<PersonFormType>()

    function onSubmit(values: PersonFormType) {
        return new Promise((resolve) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                resolve(null)
            }, 3000)
        })
    }

    useEffect(() => {
        if (!isOpen) reset()
    }, [reset, isOpen])

    return (
        <Box>
            <Button onClick={onOpen}>Open Modal</Button>
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
                            <Button
                                colorScheme='blue'
                                mr={3}
                                isLoading={isSubmitting}
                                type='submit'
                            >
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal></Box>
    )
}