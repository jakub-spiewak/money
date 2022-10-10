import {PersonForm} from "./PersonForm";
import {PersonTable} from "./PersonTable";
import {useState} from "react";
import {PersonType} from "../../utils/CommonTypes";
import {Container} from "@chakra-ui/react";
import {
    useCreatePersonMutation,
    useDeletePersonMutation,
    useEditPersonMutation, useFetchPersonQuery,
} from "../../redux/slice/person-slice";

export const PersonScreen = () => {
    const [modalState, setModalState] = useState<{ isOpen: boolean, editValue?: PersonType }>({
        isOpen: false,
        editValue: undefined
    })

    const [savePerson, {isLoading: isCreatePersonLoading}] = useCreatePersonMutation()
    const [updatePerson, {isLoading: isEditPersonLoading}] = useEditPersonMutation()
    const [deletePerson, {isLoading: isDeletePersonLoading}] = useDeletePersonMutation()

    const {data} = useFetchPersonQuery()

    const persons = data || []

    const onAdd = () => {
        setModalState({isOpen: true})
    }

    const onEdit = (person: PersonType) => {
        setModalState({isOpen: true, editValue: person})
    }

    const onDelete = (person: PersonType) => {
        person.id && deletePerson(person.id)
    }

    const onSubmit = async (person: PersonType) => {
        if (modalState.editValue) await updatePerson(person)
        else await savePerson(person)
    }

    return (
        <>
            <Container>
                <PersonTable
                    persons={persons}
                    onAdd={onAdd}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </Container>
            <PersonForm
                editValue={modalState.editValue}
                isOpen={modalState.isOpen}
                onClose={() => setModalState({isOpen: false})}
                onSubmit={onSubmit}
            />
        </>
    )
}