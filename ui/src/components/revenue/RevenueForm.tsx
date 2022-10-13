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
    Select,
} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {RevenueRequest, useReadPersonQuery} from "../../redux/generated/redux-api";
import {FormModalStateType} from "../../utils/Hooks";
import {FormNumberInput} from "../../utils/FormNumberInput";

interface Props {
    state: FormModalStateType<RevenueRequest>,
    onSubmit: (revenue: RevenueRequest) => Promise<void>
}

export const RevenueForm = (props: Props) => {
    const {state: {isOpen, close, value}, onSubmit: onSubmitFromProps} = props

    const {data: persons, } = useReadPersonQuery()

    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
        reset,
        getValues,
        setValue,
    } = useForm<RevenueRequest>()

    const onSubmit = async (revenue: RevenueRequest) => {
        await onSubmitFromProps(revenue)
        close()
    }

    useEffect(() => {
        if (isOpen) reset(value?.request || {amount: undefined, personId: undefined})
    }, [reset, value, isOpen])

    return (
        <Box>
            <Modal
                isOpen={isOpen}
                onClose={close}
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
                                    {
                                        persons?.map((person, index) => (
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
                                <FormNumberInput
                                    wrapper={{
                                        min: 0,
                                        getValues,
                                        setValue,
                                    }}
                                    {...register('amount', {
                                        valueAsNumber: true,
                                        required: 'This is required',
                                        min: {value: 0.01, message: 'Should be more than 0.00'},
                                    })}
                                />
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
                            <Button onClick={close}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </Box>
    )
}