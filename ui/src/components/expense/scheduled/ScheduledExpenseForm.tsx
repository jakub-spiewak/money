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
import {ScheduledExpenseRequest,} from "../../../redux/generated/redux-api";
import {SubmitButton} from "../../util/controller/SubmitButton";
import {TagsField} from "../../util/fields/TagsField";
import {NameField} from "../../util/fields/NameField";
import {sanitizeFormValues} from "../../../utils/util";
import {TypedAmountField} from "../../util/fields/TypedAmountField";
import {DateRangeField} from "../../util/fields/DateRangeField";

interface ExpenseProps {
    state: FormModalStateType<ScheduledExpenseRequest>,
    onSubmit: (expense: ScheduledExpenseRequest) => Promise<void>
}

export const ScheduledExpenseForm = (props: ExpenseProps) => {
    const {state: {isOpen, value, close}, onSubmit: onSubmitFromProps} = props

    const {
        handleSubmit,
        formState: {isSubmitting},
        control,
        reset,
    } = useForm<ScheduledExpenseRequest, any>()

    const onSubmit = async (expense: ScheduledExpenseRequest) => {
        await onSubmitFromProps(sanitizeFormValues(expense))
        close()
    }

    useEffect(() => {
        if (isOpen) {
            reset(value?.request || {
                amount: {
                    type: undefined,
                    data: undefined
                },
                name: undefined,
                tags: undefined,
                date: {
                    from: undefined,
                    to: undefined
                }
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
                            <TypedAmountField control={control}/>
                            <DateRangeField control={control}/>
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