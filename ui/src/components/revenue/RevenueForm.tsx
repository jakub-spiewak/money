import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {RevenueType} from "../../utils/CommonTypes";
import {useGlobalContext} from "../../utils/Context";

interface RevenueProps {
    editValue?: RevenueType,
    isOpen: boolean,
    onClose: () => void,
    onSubmit: (revenue: RevenueType) => void
}

export const RevenueForm = (props: RevenueProps) => {
    const {editValue, isOpen, onClose, onSubmit: onSubmitFromProps} = props
    const {persons} = useGlobalContext()

    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
        reset
    } = useForm<RevenueType>()

    const onSubmit = (revenue: RevenueType) => {
        onSubmitFromProps({...revenue, id: editValue?.id || new Date().getMilliseconds().toString()})
        onClose()
    }

    useEffect(() => {
        if (isOpen) reset(editValue || {amount: undefined, personId: undefined})
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
                        <ModalHeader>Add revenue</ModalHeader>
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
                            <FormControl
                                mt={4}
                                isInvalid={!!errors.personId}
                            >
                                <FormLabel>Person</FormLabel>
                                <Select
                                    placeholder={"Person"}
                                    {...register('personId', {
                                        required: 'This is required'
                                    })}
                                >
                                    {persons.map((person, index) => (
                                        <option
                                            key={`person_option_${index}`}
                                            value={person.id}
                                        >
                                            {`${person.firstName} ${person.lastName}`}
                                        </option>
                                    ))}
                                </Select>
                                <FormErrorMessage>
                                    {errors.personId && errors.personId.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                mt={4}
                                isInvalid={!!errors.amount}
                            >
                                <FormLabel>Amount</FormLabel>
                                <NumberInput
                                    defaultValue={0}
                                    min={0}
                                    placeholder='Amount'
                                    precision={2}
                                    step={1}
                                >
                                    <NumberInputField
                                        {...register('amount', {
                                            valueAsNumber: true,
                                            required: 'This is required',
                                            min: {value: 0.01, message: 'Should be more than 0.00'},
                                        })}
                                    />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper/>
                                        <NumberDecrementStepper/>
                                    </NumberInputStepper>
                                </NumberInput>
                                <FormErrorMessage>
                                    {errors.amount && errors.amount.message}
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