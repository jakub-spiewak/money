import {DeleteAlertDialog} from "../DeleteAlertDialog";
import {useDeleteScheduledExpenseMutation} from "../../../redux/generated/redux-api";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {closeDeleteModal} from "../../../redux/slice/delete-modal-slice";
import {useCallback} from "react";

export const DeleteScheduledExpenseDialog = () => {
    const dispatch = useAppDispatch()
    const [deleteExpense, {isLoading}] = useDeleteScheduledExpenseMutation()
    const {id, isOpen, name} = useAppSelector(state => state.deleteModal.SCHEDULED_EXPENSE)

    const onYes = useCallback(async () => {
        await deleteExpense({id})
    }, [deleteExpense, id])

    const close = () => {
        dispatch(closeDeleteModal("SCHEDULED_EXPENSE"))
    }

    return (
        <DeleteAlertDialog
            isOpen={isOpen}
            onClose={close}
            onYes={onYes}
            name={name}
            isLoading={isLoading}
        />
    )
}