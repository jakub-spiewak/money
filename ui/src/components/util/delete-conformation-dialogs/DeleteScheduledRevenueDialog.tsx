import {DeleteAlertDialog} from "../DeleteAlertDialog";
import {useDeleteScheduledRevenueMutation} from "../../../redux/generated/redux-api";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {closeDeleteModal} from "../../../redux/slice/delete-modal-slice";
import {useCallback} from "react";

export const DeleteScheduledRevenueDialog = () => {
    const dispatch = useAppDispatch()
    const [deleteRevenue, {isLoading}] = useDeleteScheduledRevenueMutation()
    const {id, isOpen, name} = useAppSelector(state => state.deleteModal.SCHEDULED_REVENUE)

    const onYes = useCallback(async () => {
        await deleteRevenue({id})
    }, [deleteRevenue, id])

    const close = () => {
        dispatch(closeDeleteModal("SCHEDULED_REVENUE"))
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