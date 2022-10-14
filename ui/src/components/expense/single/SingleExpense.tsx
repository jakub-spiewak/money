import {SingleExpenseForm} from "./SingleExpenseForm";
import {SingleExpenseTable} from "./SingleExpenseTable";
import {Center} from "@chakra-ui/react";
import {
    SingleExpenseRequest,
    SingleExpenseResponse, useCreateSingleExpenseMutation, useDeleteSingleExpenseMutation,
    useReadSingleExpenseQuery, useUpdateSingleExpenseMutation
} from "../../../redux/generated/redux-api";
import {useFormModalStateType} from "../../../utils/Hooks";

export const SingleExpense = () => {

    const modal = useFormModalStateType<SingleExpenseRequest>()

    const {data, isLoading, isFetching} = useReadSingleExpenseQuery()
    const [createExpense] = useCreateSingleExpenseMutation()
    const [updateExpense] = useUpdateSingleExpenseMutation()
    const [deleteExpense] = useDeleteSingleExpenseMutation()

    const onEdit = (expense: SingleExpenseResponse) => {
        expense.id && modal.open({
            id: expense.id,
            request: {
                name: expense.name,
                amount: expense.amount,
                person: expense.person?.id,
                tags: expense.tags?.map(tag => tag.id || "") || [],
                date: expense.date
            }
        })
    }

    const onDelete = (expense: SingleExpenseResponse) => {
        expense.id && deleteExpense({id: expense.id})
    }

    const onSubmit = async (expense: SingleExpenseRequest) => {
        if (modal.value?.id) await updateExpense({id: modal.value.id, singleExpenseRequest: expense})
        else await createExpense({singleExpenseRequest: expense})
    }

    return (
        <>
            <Center>
                <SingleExpenseTable
                    expenses={data || []}
                    onAdd={modal.open}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isLoading={isLoading && isFetching}
                />
            </Center>
            <SingleExpenseForm
                state={modal}
                onSubmit={onSubmit}
            />
        </>
    )
}