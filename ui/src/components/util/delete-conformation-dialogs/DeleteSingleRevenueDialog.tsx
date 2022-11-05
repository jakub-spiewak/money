import {DeleteAlertDialog} from "../DeleteAlertDialog";
import {useDeleteSingleRevenueMutation} from "../../../redux/generated/redux-api";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {closeDeleteModal} from "../../../redux/slice/delete-modal-slice";
import {useCallback} from "react";

export const DeleteSingleRevenueDialog = () => {
    const dispatch = useAppDispatch()
    const [deleteRevenue, {isLoading}] = useDeleteSingleRevenueMutation()
    const {id, isOpen, name} = useAppSelector(state => state.deleteModal.SINGLE_REVENUE)

    const onYes = useCallback(async () => {
        await deleteRevenue({id})
    }, [deleteRevenue, id])

    const close = () => {
        dispatch(closeDeleteModal("SINGLE_REVENUE"))
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