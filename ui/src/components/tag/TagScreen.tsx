import {TagForm} from "./TagForm";
import {TagTable} from "./TagTable";
import {useGlobalContext} from "../../utils/Context";
import {useState} from "react";
import {TagType} from "../../utils/CommonTypes";
import {Container} from "@chakra-ui/react";

export const TagScreen = () => {
    const {tags, setTags} = useGlobalContext()
    const [modalState, setModalState] = useState<{ isOpen: boolean, editValue?: TagType }>({
        isOpen: false,
        editValue: undefined
    })

    const onAdd = () => {
        setModalState({isOpen: true})
    }

    const onEdit = (tag: TagType) => {
        setModalState({isOpen: true, editValue: tag})
    }

    const onDelete = (tag: TagType) => {
        setTags(tags.filter(({id}) => id !== tag.id))
    }

    const onSubmit = (tag: TagType) => {
        setTags([...tags.filter(({id}) => id !== tag.id), tag])
    }

    return (
        <>
            <Container>
                <TagTable
                    tags={tags}
                    onAdd={onAdd}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </Container>
            <TagForm
                editValue={modalState.editValue}
                isOpen={modalState.isOpen}
                onClose={() => setModalState({isOpen: false})}
                onSubmit={onSubmit}
            />
        </>
    )
}