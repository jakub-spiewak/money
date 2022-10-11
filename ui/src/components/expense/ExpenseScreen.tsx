import {ExpenseForm} from "./ExpenseForm";
import {ExpenseTable} from "./ExpenseTable";
import {Container} from "@chakra-ui/react";
import {useFormModalStateType} from "../../utils/Hooks";
import {
    ExpenseRequest,
    ExpenseResponse,
    useCreateExpenseMutation,
    useDeleteExpenseMutation,
    useReadExpenseQuery,
    useReadPersonQuery,
    useReadTagQuery,
    useUpdateExpenseMutation
} from "../../redux/generated/redux-api";
import {useEffect} from "react";

export const ExpenseScreen = () => {

    const modal = useFormModalStateType<ExpenseRequest>()

    const {data: tags} = useReadTagQuery()
    const {data: persons} = useReadPersonQuery()

    const {data, isLoading, isFetching, refetch} = useReadExpenseQuery()
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

    useEffect(() => {
       refetch()
    }, [tags, persons, refetch])

    return (
        <>
            <Container maxW={'8xl'}>
                <ExpenseTable
                    expenses={data || []}
                    onAdd={modal.open}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isLoading={isLoading && isFetching}
                />
            </Container>
            <ExpenseForm
                state={modal}
                onSubmit={onSubmit}
            />
        </>
    )
}