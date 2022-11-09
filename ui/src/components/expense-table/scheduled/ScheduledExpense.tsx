import {useDeleteScheduledExpenseMutation, useReadScheduledExpenseQuery} from "../../../redux/generated/redux-api";
import {Center} from "@chakra-ui/react";
import {ScheduledExpenseTable} from "./ScheduledExpenseTable";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {openModal} from "../../../redux/slice/modal-slice";

interface Props {
    currentExpense?: string,
}

export const ScheduledExpense = (props: Props) => {
    const {currentExpense} = props

    const dispatch = useAppDispatch()
    const {year, month} = useAppSelector(state => state.currentDate)

    const {
        data,
        isLoading,
        isFetching
    } = useReadScheduledExpenseQuery({month: `${year}-${month <= 9 ? `0${month}` : month}`})
    const [deleteExpense] = useDeleteScheduledExpenseMutation()

    const onEdit = (id: string) => {
        const expense = data?.find((value) => value.id === id)
        if (!expense) return
        dispatch(
            openModal({
                modal: "SCHEDULED_EXPENSE",
                id: expense.id,
                value: {
                    name: expense.name,
                    amount: expense.amount,
                    date: expense.date,
                    tags: expense.tags?.map(tag => tag.id || "") || []
                }
            })
        )
    }

    const onDelete = async (id: string) => {
        await deleteExpense({id})
    }


    return (
        <Center>
            <ScheduledExpenseTable
                items={data || []}
                onEdit={onEdit}
                onDelete={onDelete}
                isLoading={isLoading && isFetching}
                currentExpense={currentExpense}
            />
        </Center>
    )
}