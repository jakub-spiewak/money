import {DeleteAlertDialog} from "../DeleteAlertDialog";
import {useDeleteTagMutation} from "../../../redux/generated/redux-api";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {closeDeleteModal} from "../../../redux/slice/delete-modal-slice";
import {useCallback} from "react";

export const DeleteTagDialog = () => {
    const dispatch = useAppDispatch()
    const [deleteTag, {isLoading}] = useDeleteTagMutation()
    const {id, isOpen, name} = useAppSelector(state => state.deleteModal.TAG)

    const onYes = useCallback(async () => {
        await deleteTag({id})
    }, [deleteTag, id])

    const close = () => {
        dispatch(closeDeleteModal("TAG"))
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