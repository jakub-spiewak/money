import {ExpenseForm} from "./ExpenseForm";
import {ExpenseTable} from "./ExpenseTable";
import {Center} from "@chakra-ui/react";
import {useFormModalStateType} from "../../utils/Hooks";
import {
    ExpenseRequest,
    ExpenseResponse,
    useCreateExpenseMutation,
    useDeleteExpenseMutation,
    useReadExpenseQuery,
    useUpdateExpenseMutation
} from "../../redux/generated/redux-api";

export const ExpenseScreen = () => {

    const modal = useFormModalStateType<ExpenseRequest>()

    const {data, isLoading, isFetching} = useReadExpenseQuery()
    const [createExpense] = useCreateExpenseMutation()
    const [updateExpense] = useUpdateExpenseMutation()
    const [deleteExpense] = useDeleteExpenseMutation()

    const onEdit = (expense: ExpenseResponse) => {
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

    const onDelete = (expense: ExpenseResponse) => {
        expense.id && deleteExpense({id: expense.id})
    }

    const onSubmit = async (expense: ExpenseRequest) => {
        if (modal.value?.id) await updateExpense({id: modal.value.id, expenseRequest: expense})
        else await createExpense({expenseRequest: expense})
    }

    return (
        <>
            <Center>
                <ExpenseTable
                    expenses={data || []}
                    onAdd={modal.open}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isLoading={isLoading && isFetching}
                />
            </Center>
            <ExpenseForm
                state={modal}
                onSubmit={onSubmit}
            />
        </>
    )
}