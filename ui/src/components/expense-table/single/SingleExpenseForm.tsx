import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useToast,
} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {
    SingleExpenseRequest,
    useCreateSingleExpenseMutation,
    useReadScheduledExpenseQuery,
    useUpdateSingleExpenseMutation
} from "../../../redux/generated/redux-api";
import {SubmitButton} from "../../util/controller/SubmitButton";
import {AmountField} from "../../util/fields/amount/AmountField";
import {TagsField} from "../../util/fields/TagsField";
import {NameField} from "../../util/fields/NameField";
import {DateField} from "../../util/fields/DateField";
import {ExpenseField} from "../../util/fields/ExpenseField";
import {sanitizeFormValues} from "../../../utils/util";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {closeModal} from "../../../redux/slice/modal-slice";

export const SingleExpenseForm = () => {
    const dispatch = useAppDispatch()
    const {isOpen, value, id} = useAppSelector(state => state.modal.SINGLE_EXPENSE)
    const {value: currentMonthStr} = useAppSelector(state => state.currentDate)
    const toast = useToast()

    const [createExpense, createResult] = useCreateSingleExpenseMutation()
    const [updateExpense, updateResult] = useUpdateSingleExpenseMutation()
    const {data: scheduledExpenses} = useReadScheduledExpenseQuery({month: currentMonthStr})

    const close = () => dispatch(closeModal("SINGLE_EXPENSE"))

    const {
        handleSubmit,
        control,
        formState: {isSubmitting, isDirty},
        reset,
        watch, setValue
    } = useForm<SingleExpenseRequest>()

    const onSubmit = async (expense: SingleExpenseRequest) => {
        const request = sanitizeFormValues(expense)
        if (id) await updateExpense({id, singleExpenseRequest: request})
        else await createExpense({singleExpenseRequest: request})
        close()
    }

    const parentExpense = watch("parentExpense")

    useEffect(() => {
        if (!parentExpense || !scheduledExpenses) return

        const tagsFromParent = scheduledExpenses.find(v => v.id === parentExpense)?.tags
        if (!tagsFromParent) return

        setValue("tags", tagsFromParent.map(v => v.id), {shouldValidate: true, shouldTouch: true})
    }, [parentExpense, scheduledExpenses, setValue])

    useEffect(() => {
        if (isOpen) {
            reset(value || {
                amount: undefined,
                name: undefined,
                tags: undefined,
                date: undefined,
                parentExpense: undefined
            })
        }
    }, [reset, value, isOpen])

    useEffect(() => {
        if (createResult?.isSuccess) {
            createResult.reset()
            toast({
                title: 'Success!',
                description: `An expense has been created.`,
                status: "success",
                position: "top"
            })
        }
    }, [toast, createResult])

    useEffect(() => {
        if (updateResult?.isSuccess) {
            updateResult.reset()
            toast({
                title: 'Success!',
                description: `An expense has been updated.`,
                status: "success",
                position: "top"
            })
        }
    }, [toast, updateResult])

    return (
        <Modal
            isOpen={isOpen}
            onClose={close}
        >
            <ModalOverlay backdropFilter={"blur(3px)"}/>
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
                            defaultValue={value?.parentExpense}
                        />
                        <TagsField control={control}/>
                    </ModalBody>

                    <ModalFooter>
                        <SubmitButton
                            disabled={!isDirty}
                            isLoading={isSubmitting}
                        />
                        <Button onClick={close}>Cancel</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}