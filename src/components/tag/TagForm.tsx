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

interface TagFormProps {
    editValue?: TagType,
    isOpen: boolean,
    onClose: () => void,
    onSubmit: (person: TagType) => void
}

export const TagForm = (props: TagFormProps) => {
    const {editValue, isOpen, onClose, onSubmit: onSubmitFromProps} = props

    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
        reset
    } = useForm<TagType>()

    const onSubmit = (person: TagType) => {
        onSubmitFromProps({...person, id: editValue?.id || new Date().getMilliseconds().toString()})
        onClose()
    }

    useEffect(() => {
        if (isOpen) reset(editValue || {name: undefined})
    }, [reset, editValue, isOpen])

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
                                        minLength: {value: 4, message: 'Minimum length should be 4'},
                                        maxLength: {value: 32, message: 'Maximum length should be 32'}
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
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
            </Modal>
        </Box>
    )
}