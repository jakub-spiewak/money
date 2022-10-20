import {ScheduledExpenseForm} from "./ScheduledExpenseForm";
import {FormModalStateType} from "../../../utils/Hooks";
import {
    ScheduledExpenseRequest, ScheduledExpenseResponse,
    useCreateScheduledExpenseMutation, useDeleteScheduledExpenseMutation,
    useReadScheduledExpenseQuery, useUpdateScheduledExpenseMutation
} from "../../../redux/generated/redux-api";
import {Center} from "@chakra-ui/react";
import {ScheduledExpenseTable} from "./ScheduledExpenseTable";
import {useAppSelector} from "../../../redux/hooks";

interface Props {
    modal: FormModalStateType<ScheduledExpenseRequest>
}

export const ScheduledExpense = (props: Props) => {
    const {modal} = props

    const {year, month} = useAppSelector(state => state.currentDate)
    const {
        data,
        isLoading,
        isFetching
    } = useReadScheduledExpenseQuery({month: `${year}-${month <= 9 ? `0${month}` : month}`})

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
                date: expense.date,
                tags: expense.tags?.map(tag => tag.id || "") || []
            }
        })
    }

    const onDelete = async (expense: ScheduledExpenseResponse) => {
        expense.id && await deleteExpense({id: expense.id})
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