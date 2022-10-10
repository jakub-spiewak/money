import {TagForm} from "./TagForm";
import {TagTable} from "./TagTable";
import {Container} from "@chakra-ui/react";
import {useFormModalStateType} from "../../utils/Hooks";

import {
    TagRequest,
    TagResponse,
    useCreateTagMutation,
    useDeleteTagMutation, useReadTagQuery,
    useUpdateTagMutation
} from "../../redux/generated/redux-api";

export const TagScreen = () => {

    const modal = useFormModalStateType<TagRequest>()

    const {data, isLoading, isFetching} = useReadTagQuery()
    const [saveTag] = useCreateTagMutation()
    const [updateTag] = useUpdateTagMutation()
    const [deleteTag] = useDeleteTagMutation()

    const onEdit = (tag: TagResponse) => {
        tag.id && modal.open({id: tag.id, request: tag})
    }

    const onDelete = (tag: TagResponse) => {
        tag.id && deleteTag({id: tag.id})
    }

    const onSubmit = async (tag: TagRequest) => {
        if (modal.value?.id) await updateTag({id: modal.value.id, tagRequest: tag})
        else await saveTag({tagRequest: tag})
    }

    return (
        <>
            <Container>
                <TagTable
                    tags={data || []}
                    onAdd={modal.open}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isLoading={isLoading || isFetching}
                />
            </Container>
            <TagForm
                value={modal.value}
                isOpen={modal.isOpen}
                onClose={modal.close}
                onSubmit={onSubmit}
            />
        </>
    )
}