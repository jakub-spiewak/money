import {
    Box,
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
import {FormModalStateType} from "../../../utils/Hooks";
import {SingleExpenseRequest} from "../../../redux/generated/redux-api";
import {SubmitButton} from "../../util/form/SubmitButton";
import {AmountField} from "../../util/fields/AmountField";
import {PersonField} from "../../util/fields/PersonField";
import {TagsField} from "../../util/fields/TagsField";
import {NameField} from "../../util/fields/NameField";
import {DateField} from "../../util/fields/DateField";
import {ExpenseField} from "../../util/fields/ExpenseField";
import {sanitizeFormValues} from "../../../utils/util";

interface Props {
    state: FormModalStateType<SingleExpenseRequest>,
    onSubmit: (expense: SingleExpenseRequest) => Promise<void>
}

export const SingleExpenseForm = (props: Props) => {
    const {state: {isOpen, value, close}, onSubmit: onSubmitFromProps} = props

    const {
        handleSubmit,
        control,
        formState: {isSubmitting},
        reset,
    } = useForm<SingleExpenseRequest>()

    const onSubmit = async (expense: SingleExpenseRequest) => {
        await onSubmitFromProps(sanitizeFormValues(expense))
        close()
    }

    useEffect(() => {
        if (isOpen) {
            reset(value?.request || {
                amount: undefined,
                person: undefined,
                name: undefined,
                tags: undefined,
                parentExpense: undefined
            })
        }
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
                        <ModalHeader>Add expense</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody pb={6}>
                            <NameField control={control}/>
                            <AmountField control={control}/>
                            <DateField control={control}/>
                            <ExpenseField
                                name={"parentExpense"}
                                label={"Parent expense"}
                                control={control}
                                defaultValue={value?.request?.parentExpense}
                            />
                            <PersonField
                                control={control}
                                defaultValue={value?.request?.person}
                            />
                            <TagsField control={control}/>
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