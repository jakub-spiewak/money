import {SingleExpenseTable} from "./SingleExpenseTable";
import {Center} from "@chakra-ui/react";
import {useDeleteSingleExpenseMutation, useReadSingleExpenseQuery} from "../../../redux/generated/redux-api";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {openModal} from "../../../redux/slice/modal-slice";

interface Props {
    onExpenseClick?: (id: string) => void,
}

export const SingleExpense = (props: Props) => {
    const {onExpenseClick} = props

    const dispatch = useAppDispatch()
    const {year, month} = useAppSelector(state => state.currentDate)

    const {
        data,
        isLoading,
        isFetching
    } = useReadSingleExpenseQuery({month: `${year}-${month <= 9 ? `0${month}` : month}`})
    const [deleteExpense] = useDeleteSingleExpenseMutation()

    const onEdit = (id: string) => {
        const expense = data?.find(value => value.id === id)
        if (!expense) return
        dispatch(
            openModal({
                modal: "SINGLE_EXPENSE",
                id: expense.id,
                value: {
                    name: expense.name,
                    amount: expense.amount,
                    parentExpense: expense.parentExpense?.id,
                    tags: expense.tags?.map(tag => tag.id || "") || [],
                    date: expense.date
                }
            })
        )
    }

    const onDelete = async (id: string) => {
        await deleteExpense({id})
    }

    return (
        <Center>
            <SingleExpenseTable
                items={data || []}
                onEdit={onEdit}
                onDelete={onDelete}
                isLoading={isLoading && isFetching}
                onExpenseClick={onExpenseClick}
            />
        </Center>
    )
}