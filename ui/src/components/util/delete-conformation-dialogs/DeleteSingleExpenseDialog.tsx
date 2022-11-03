import {DeleteAlertDialog} from "../DeleteAlertDialog";
import {useDeleteSingleExpenseMutation} from "../../../redux/generated/redux-api";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {closeDeleteModal} from "../../../redux/slice/delete-modal-slice";
import {useCallback} from "react";

export const DeleteSingleExpenseDialog = () => {
    const dispatch = useAppDispatch()
    const [deleteExpense, {isLoading}] = useDeleteSingleExpenseMutation()
    const {id, isOpen, name} = useAppSelector(state => state.deleteModal.SINGLE_EXPENSE)

    const onYes = useCallback(async () => {
        await deleteExpense({id})
    }, [deleteExpense, id])

    const close = () => {
        dispatch(closeDeleteModal("SINGLE_EXPENSE"))
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