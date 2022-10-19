import {SingleExpenseForm} from "./SingleExpenseForm";
import {SingleExpenseTable} from "./SingleExpenseTable";
import {Center} from "@chakra-ui/react";
import {
    SingleExpenseRequest,
    SingleExpenseResponse,
    useCreateSingleExpenseMutation,
    useDeleteSingleExpenseMutation, useReadSingleExpenseQuery,
    useUpdateSingleExpenseMutation
} from "../../../redux/generated/redux-api";
import {FormModalStateType} from "../../../utils/Hooks";
import {useAppSelector} from "../../../redux/hooks";

interface Props {
    modal: FormModalStateType<SingleExpenseRequest>
}

export const SingleExpense = (props: Props) => {
    const {modal} = props

    const {year, month} = useAppSelector(state => state.currentDate)

    const {
        data,
        isLoading,
        isFetching
    } = useReadSingleExpenseQuery({month: `${year}-${month <= 9 ? `0${month}` : month}`})
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
                parentExpense: expense.parentExpense?.id,
                tags: expense.tags?.map(tag => tag.id || "") || [],
                date: expense.date
            }
        })
    }

    const onDelete = async (expense: SingleExpenseResponse) => {
        expense.id && await deleteExpense({id: expense.id})
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