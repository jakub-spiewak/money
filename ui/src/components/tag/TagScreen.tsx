import {TagTable} from "./TagTable";

import {TagResponse, useReadTagQuery,} from "../../redux/generated/redux-api";
import {useAppDispatch} from "../../redux/hooks";
import {openModal} from "../../redux/slice/modal-slice";
import {askForDelete} from "../../redux/slice/delete-modal-slice";
import {TagNavigation} from "./TagNavigation";
import {VStack} from "@chakra-ui/react";

export const TagScreen = () => {
    const dispatch = useAppDispatch()

    const {data, isLoading, isFetching} = useReadTagQuery()

    const onEdit = (tag: TagResponse) => {
        dispatch(openModal({modal: "TAG", id: tag.id, value: tag}))
    }

    const onDelete = async (tag: TagResponse) => {
        dispatch(askForDelete({type: "TAG", id: tag.id, name: tag.name}))
    }

    return (
        <>
            <TagNavigation/>
            <VStack
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <TagTable
                    data={data || []}
                    onAdd={() => dispatch(openModal({modal: "TAG"}))}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isLoading={isLoading || isFetching}
                />
            </VStack>
        </>
    )
}