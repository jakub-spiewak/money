import {TagForm} from "./TagForm";
import {TagTable} from "./TagTable";
import {Center} from "@chakra-ui/react";
import {useFormModalStateType} from "../../utils/Hooks";

import {
    TagRequest,
    TagResponse,
    useCreateTagMutation,
    useDeleteTagMutation,
    useReadTagQuery,
    useUpdateTagMutation
} from "../../redux/generated/redux-api";

export const TagScreen = () => {

    const modal = useFormModalStateType<TagRequest>()

    const {data, isLoading, isFetching} = useReadTagQuery()
    const [createTag] = useCreateTagMutation()
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
        else await createTag({tagRequest: tag})
    }


    return (
        <>
            <Center>
                <TagTable
                    tags={data || []}
                    onAdd={modal.open}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isLoading={isLoading || isFetching}
                />
            </Center>
            <TagForm
                state={modal}
                onSubmit={onSubmit}
            />
        </>
    )
}