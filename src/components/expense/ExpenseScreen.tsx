import {ExpenseForm} from "./ExpenseForm";
import {ExpenseTable} from "./ExpenseTable";
import {useGlobalContext} from "../../utils/Context";
import {useState} from "react";
import {Container} from "@chakra-ui/react";
import {ExpenseType} from "../../utils/CommonTypes";

export const ExpenseScreen = () => {
    const {expenses, setExpenses} = useGlobalContext()
    const [modalState, setModalState] = useState<{ isOpen: boolean, editValue?: ExpenseType }>({
        isOpen: false,
        editValue: undefined
    })

    const onAdd = () => {
        setModalState({isOpen: true})
    }

    const onEdit = (expense: ExpenseType) => {
        setModalState({isOpen: true, editValue: expense})
    }

    const onDelete = (expense: ExpenseType) => {
        setExpenses(expenses.filter(({id}) => id !== expense.id))
    }

    const onSubmit = (expense: ExpenseType) => {
        setExpenses([...expenses.filter(({id}) => id !== expense.id), expense])
    }

    return (
        <>
            <Container maxW={'8xl'}>
                <ExpenseTable
                    expenses={expenses}
                    onAdd={onAdd}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </Container>
            <ExpenseForm
                editValue={modalState.editValue}
                isOpen={modalState.isOpen}
                onClose={() => setModalState({isOpen: false})}
                onSubmit={onSubmit}
            />
        </>
    )
}