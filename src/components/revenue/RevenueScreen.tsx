import {RevenueForm} from "./RevenueForm";
import {RevenueTable} from "./RevenueTable";
import {useGlobalContext} from "../../utils/Context";
import {useState} from "react";
import {Container} from "@chakra-ui/react";
import {RevenueType} from "../../utils/CommonTypes";

export const RevenueScreen = () => {
    const {revenues, setRevenues} = useGlobalContext()
    const [modalState, setModalState] = useState<{ isOpen: boolean, editValue?: RevenueType }>({
        isOpen: false,
        editValue: undefined
    })

    const onAdd = () => {
        setModalState({isOpen: true})
    }

    const onEdit = (revenue: RevenueType) => {
        setModalState({isOpen: true, editValue: revenue})
    }

    const onDelete = (revenue: RevenueType) => {
        setRevenues(revenues.filter(({id}) => id !== revenue.id))
    }

    const onSubmit = (revenue: RevenueType) => {
        setRevenues([...revenues.filter(({id}) => id !== revenue.id), revenue])
    }

    return (
        <>
            <Container>
                <RevenueTable
                    revenues={revenues}
                    onAdd={onAdd}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </Container>
            <RevenueForm
                editValue={modalState.editValue}
                isOpen={modalState.isOpen}
                onClose={() => setModalState({isOpen: false})}
                onSubmit={onSubmit}
            />
        </>
    )
}