import {DeleteAlertDialog} from "../DeleteAlertDialog";
import {useDeleteSingleRevenueMutation} from "../../../redux/generated/redux-api";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {closeDeleteModal} from "../../../redux/slice/delete-modal-slice";
import {useCallback, useEffect} from "react";
import {useToast} from "@chakra-ui/react";

export const DeleteSingleRevenueDialog = () => {
    const dispatch = useAppDispatch()
    const [deleteRevenue, {isLoading, isSuccess}] = useDeleteSingleRevenueMutation()
    const {id, isOpen, name} = useAppSelector(state => state.deleteModal.SINGLE_REVENUE)
    const toast = useToast()

    const onYes = useCallback(async () => {
        await deleteRevenue({id})
    }, [deleteRevenue, id])

    const close = () => {
        dispatch(closeDeleteModal("SINGLE_REVENUE"))
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