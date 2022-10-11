import {PersonForm} from "./PersonForm";
import {PersonTable} from "./PersonTable";
import {Container} from "@chakra-ui/react";

import {
    PersonRequest,
    PersonResponse,
    useCreatePersonMutation,
    useDeletePersonMutation,
    useReadPersonQuery,
    useUpdatePersonMutation
} from "../../redux/generated/redux-api";

import {useFormModalStateType} from "../../utils/Hooks";

export const PersonScreen = () => {

    const modal = useFormModalStateType<PersonResponse>()

    const [createPerson] = useCreatePersonMutation()
    const [updatePerson] = useUpdatePersonMutation()
    const [deletePerson] = useDeletePersonMutation()

    const {data, isLoading, isFetching} = useReadPersonQuery()

    const onEdit = (person: PersonResponse) => {
        person.id && modal.open({id: person.id, request: person})
    }

    const onDelete = (person: PersonResponse) => {
        person.id && deletePerson({id: person.id})
    }

    const onSubmit = async (person: PersonRequest) => {
        if (modal.value?.id) await updatePerson({id: modal.value.id, personRequest: person})
        else await createPerson({personRequest: person})
    }

    return (
        <>
            <Container>
                <PersonTable
                    persons={data || []}
                    onAdd={modal.open}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isLoading={isLoading || isFetching}
                />
            </Container>
            <PersonForm
                state={modal}
                onSubmit={onSubmit}
            />
        </>
    )
}