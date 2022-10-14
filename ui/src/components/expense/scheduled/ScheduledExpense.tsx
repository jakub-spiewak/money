import {ScheduledExpenseForm} from "./ScheduledExpenseForm";
import {useFormModalStateType} from "../../../utils/Hooks";
import {
    ScheduledExpenseRequest, ScheduledExpenseResponse,
    useCreateScheduledExpenseMutation, useDeleteScheduledExpenseMutation,
    useReadScheduledExpenseQuery, useUpdateScheduledExpenseMutation
} from "../../../redux/generated/redux-api";
import {Center} from "@chakra-ui/react";
import {ScheduledExpenseTable} from "./ScheduledExpenseTable";

export const ScheduledExpense = () => {

    const modal = useFormModalStateType<ScheduledExpenseRequest>()

    const {data, isLoading, isFetching} = useReadScheduledExpenseQuery()
    const [createExpense] = useCreateScheduledExpenseMutation()
    const [updateExpense] = useUpdateScheduledExpenseMutation()
    const [deleteExpense] = useDeleteScheduledExpenseMutation()

    const onEdit = (expense: ScheduledExpenseResponse) => {
        expense.id && modal.open({
            id: expense.id,
            request: {
                name: expense.name,
                amount: expense.amount,
                person: expense.person?.id,
                tags: expense.tags?.map(tag => tag.id || "") || []
            }
        })
    }

    const onDelete = (expense: ScheduledExpenseResponse) => {
        expense.id && deleteExpense({id: expense.id})
    }

    const onSubmit = async (expense: ScheduledExpenseRequest) => {
        if (modal.value?.id) await updateExpense({id: modal.value.id, scheduledExpenseRequest: expense})
        else await createExpense({scheduledExpenseRequest: expense})
    }

    return (
        <>
            <Center>
                <ScheduledExpenseTable
                    expenses={data || []}
                    onAdd={modal.open}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isLoading={isLoading && isFetching}
                />
            </Center>
            <ScheduledExpenseForm
                state={modal}
                onSubmit={onSubmit}
            />
        </>
    )
}