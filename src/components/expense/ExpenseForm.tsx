import {
    Box,
    Button, Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input, Menu, MenuButton, MenuItem, MenuList,
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
    Select, Tag, TagCloseButton, TagLabel,
} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {ExpenseType, TagType} from "../../utils/CommonTypes";
import {useGlobalContext} from "../../utils/Context";
import {AddIcon, ChevronDownIcon} from "@chakra-ui/icons";

interface ExpenseProps {
    editValue?: ExpenseType,
    isOpen: boolean,
    onClose: () => void,
    onSubmit: (revenue: ExpenseType) => void
}

export const ExpenseForm = (props: ExpenseProps) => {
    const {editValue, isOpen, onClose, onSubmit: onSubmitFromProps} = props
    const {persons, tags} = useGlobalContext()

    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
        reset
    } = useForm<ExpenseType>()

    const [formTags, setFormTags] = useState<TagType[]>([])

    const onSubmit = (revenue: ExpenseType) => {
        revenue.tagsIds = formTags.map((tag) => tag.id)
        alert(JSON.stringify(revenue))
        onSubmitFromProps({...revenue, id: editValue?.id || new Date().getMilliseconds().toString()})
        onClose()
    }

    useEffect(() => {
        if (isOpen) {
            reset(editValue || {amount: undefined, personId: undefined})
        }
        if (isOpen && editValue) {
            setFormTags(
                editValue.tagsIds
                    .map((tagId) => tags.find((t) => t.id === tagId))
                    .filter(tag => tag !== undefined) as TagType[]
            )
        } else {
            setFormTags([])
        }
    }, [reset, editValue, isOpen, tags])

    return (
        <Box>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
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
                                isInvalid={!!errors.personId}
                            >
                                <FormLabel>From</FormLabel>
                                <Select
                                    placeholder={"Home"}
                                    {...register('personId')}
                                >
                                    {persons.map((person) => (
                                        <option value={person.id}>{`${person.firstName} ${person.lastName}`}</option>
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
                            <FormControl pt={2}>
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        mt={4}
                                        leftIcon={<AddIcon/>}
                                        disabled={tags.filter(tag => !formTags.includes(tag)).length === 0}
                                    >
                                        Tag
                                    </MenuButton>
                                    <MenuList>
                                        {tags.filter(tag => !formTags.includes(tag)).map((tag, index) => (
                                            <MenuItem
                                                key={`form_tag_${index}`}
                                                onClick={() => {
                                                    setFormTags(prev => [...prev, tag])
                                                }}
                                            >
                                                {tag.name.toUpperCase()}
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
                                            <TagLabel>{tag.name.toUpperCase()}</TagLabel>
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