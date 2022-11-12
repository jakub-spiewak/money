import {DeleteAlertDialog} from "../DeleteAlertDialog";
import {useDeleteTagMutation} from "../../../redux/generated/redux-api";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {closeDeleteModal} from "../../../redux/slice/delete-modal-slice";
import {useCallback, useEffect} from "react";
import {useToast} from "@chakra-ui/react";

export const DeleteTagDialog = () => {
    const dispatch = useAppDispatch()
    const [deleteTag, {isLoading, isSuccess}] = useDeleteTagMutation()
    const {id, isOpen, name} = useAppSelector(state => state.deleteModal.TAG)
    const toast = useToast()

    const onYes = useCallback(async () => {
        await deleteTag({id})
    }, [deleteTag, id])

    const close = () => {
        dispatch(closeDeleteModal("TAG"))
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