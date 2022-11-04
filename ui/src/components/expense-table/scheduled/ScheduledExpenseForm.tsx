import {
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
import {
    ScheduledExpenseRequest,
    useCreateScheduledExpenseMutation,
    useUpdateScheduledExpenseMutation,
} from "../../../redux/generated/redux-api";
import {SubmitButton} from "../../util/controller/SubmitButton";
import {TagsField} from "../../util/fields/TagsField";
import {NameField} from "../../util/fields/NameField";
import {sanitizeFormValues} from "../../../utils/util";
import {TypedAmountField} from "../../util/fields/TypedAmountField";
import {DateRangeField} from "../../util/fields/DateRangeField";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {closeModal} from "../../../redux/slice/modal-slice";

export const ScheduledExpenseForm = () => {
    const dispatch = useAppDispatch()
    const {isOpen, value, id} = useAppSelector(state => state.modal.SCHEDULED_EXPENSE)

    const [createExpense] = useCreateScheduledExpenseMutation()
    const [updateExpense] = useUpdateScheduledExpenseMutation()

    const close = () => dispatch(closeModal("SCHEDULED_EXPENSE"))

    const {
        handleSubmit,
        formState: {isSubmitting},
        control,
        reset,
    } = useForm<ScheduledExpenseRequest>()

    const onSubmit = async (expense: ScheduledExpenseRequest) => {
        const request = sanitizeFormValues(expense)
        if (id) await updateExpense({id, scheduledExpenseRequest: request})
        else await createExpense({scheduledExpenseRequest: request})
        close()
    }

    useEffect(() => {
        if (isOpen) {
            reset(value || {
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
    )

}