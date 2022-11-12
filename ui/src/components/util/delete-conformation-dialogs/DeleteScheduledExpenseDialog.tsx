import {DeleteAlertDialog} from "../DeleteAlertDialog";
import {useDeleteScheduledExpenseMutation} from "../../../redux/generated/redux-api";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {closeDeleteModal} from "../../../redux/slice/delete-modal-slice";
import {useCallback, useEffect} from "react";
import {useToast} from "@chakra-ui/react";

export const DeleteScheduledExpenseDialog = () => {
    const dispatch = useAppDispatch()
    const [deleteExpense, {isLoading, isSuccess}] = useDeleteScheduledExpenseMutation()
    const {id, isOpen, name} = useAppSelector(state => state.deleteModal.SCHEDULED_EXPENSE)
    const toast = useToast()

    const onYes = useCallback(async () => {
        await deleteExpense({id})
    }, [deleteExpense, id])

    const close = () => {
        dispatch(closeDeleteModal("SCHEDULED_EXPENSE"))
    }

    useEffect(() => {
        if (isSuccess) {
            toast({
                title: 'Success!',
                description: `Deleted successfully`,
                status: "success",
                position: "top"
            })
        }
    }, [toast, isSuccess])

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