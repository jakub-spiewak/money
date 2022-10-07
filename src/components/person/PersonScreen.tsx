import {PersonForm} from "./PersonForm";
import {PersonTable} from "./PersonTable";
import {useGlobalContext} from "../../utils/Context";
import {useState} from "react";
import {PersonType} from "../../utils/CommonTypes";
import {Container} from "@chakra-ui/react";

export const PersonScreen = () => {
    const {persons, setPersons} = useGlobalContext()
    const [modalState, setModalState] = useState<{ isOpen: boolean, editValue?: PersonType }>({
        isOpen: false,
        editValue: undefined
    })

    const onAdd = () => {
        setModalState({isOpen: true})
    }

    const onEdit = (person: PersonType) => {
        setModalState({isOpen: true, editValue: person})
    }

    const onDelete = (person: PersonType) => {
        setPersons(persons.filter(({id}) => id !== person.id))
    }

    const onSubmit = (person: PersonType) => {
        setPersons([...persons.filter(({id}) => id !== person.id), person])
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