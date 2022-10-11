import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
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
    Tag,
    TagCloseButton,
    TagLabel,
} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {AddIcon} from "@chakra-ui/icons";
import {FormModalStateType} from "../../utils/Hooks";
import {ExpenseRequest, TagResponse, useReadPersonQuery, useReadTagQuery} from "../../redux/generated/redux-api";
import {SubmitButton} from "../util/SubmitButton";

interface ExpenseProps {
    state: FormModalStateType<ExpenseRequest>,
    onSubmit: (expense: ExpenseRequest) => Promise<void>
}

export const ExpenseForm = (props: ExpenseProps) => {
    const {state: {isOpen, value, close}, onSubmit: onSubmitFromProps} = props

    const {data: tags} = useReadTagQuery()
    const {data: persons} = useReadPersonQuery()

    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
        reset
    } = useForm<ExpenseRequest>()

    const [formTags, setFormTags] = useState<TagResponse[]>([])

    const onSubmit = async (expense: ExpenseRequest) => {
        expense.tags = formTags.map((tag) => tag.id || "")
        await onSubmitFromProps(expense)
        close()
    }

    useEffect(() => {
        if (isOpen) {
            reset(value?.request || {amount: undefined, person: undefined, name: undefined, tags: undefined})
        }

        if (isOpen && value) {
            setFormTags(
                value.request?.tags
                    ?.map((tag) => tags?.find(t => t.id === tag) || {}) || []
            )
        } else {
            setFormTags([])
        }
    }, [reset, value, isOpen, tags])

    return (
        <Box>
            <Modal
                isOpen={isOpen}
                onClose={close}
            >
                <ModalOverlay/>
                <ModalContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader>Add expense</ModalHeader>
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
                                isInvalid={!!errors.person}
                            >
                                <FormLabel>From</FormLabel>
                                <Select
                                    placeholder={"Home"}
                                    {...register('person')}
                                >
                                    {persons?.map((person, index) => (
                                        <option
                                            key={`person_option_${index}`}
                                            value={person.id}
                                        >
                                            {`${person.firstName} ${person.lastName}`}
                                        </option>
                                    ))}
                                </Select>
                                <FormErrorMessage>
                                    {errors.person && errors.person.message}
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
                            <FormControl pt={2}>
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        mt={4}
                                        leftIcon={<AddIcon/>}
                                        disabled={tags?.filter(tag => !formTags.includes(tag)).length === 0}
                                    >
                                        Tag
                                    </MenuButton>
                                    <MenuList>
                                        {tags?.filter(tag => !formTags.includes(tag)).map((tag, index) => (
                                            <MenuItem
                                                key={`form_tag_${index}`}
                                                onClick={() => {
                                                    setFormTags(prev => [...prev, tag])
                                                }}
                                            >
                                                {tag.name?.toUpperCase()}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </Menu>
                                <Flex
                                    mt={4}
                                    flexWrap={'wrap'}
                                    gap={2}
                                >
                                    {formTags.map((tag, index) => (
                                        <Tag
                                            size={'md'}
                                            key={`form_selected_tag_${index}`}
                                            borderRadius='full'
                                            variant='solid'
                                            colorScheme='green'
                                        >
                                            <TagLabel>{tag.name?.toUpperCase()}</TagLabel>
                                            <TagCloseButton
                                                onClick={() => {
                                                    setFormTags(prev => prev.filter(t => t.id !== tag.id))
                                                }}
                                            />
                                        </Tag>
                                    ))}
                                </Flex>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <SubmitButton isLoading={isSubmitting}/>
                            <Button onClick={close}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </Box>
    )
}