import {createContext, ReactNode, useContext, useEffect, useMemo, useState} from "react";
import {ExpenseType, PersonType, RevenueType, TagType} from "./CommonTypes";

interface ContextType {
    persons: PersonType[],
    setPersons: (persons: PersonType[]) => void,
    tags: TagType[],
    setTags: (tags: TagType[]) => void,
    revenues: RevenueType[],
    setRevenues: (revenues: RevenueType[]) => void,
    expenses: ExpenseType[],
    setExpenses: (expense: ExpenseType[]) => void,
}

const getDefaultValue = (): ContextType => {
    const storageContext = localStorage.getItem('context')
    if (storageContext) {
        return JSON.parse(storageContext) as ContextType
    }
    return {
        persons: [],
        setPersons: () => {
        },
        tags: [],
        setTags: () => {
        },
        revenues: [],
        setRevenues: () => {
        },
        expenses: [],
        setExpenses: () => {
        }
    }
}
const GlobalContext = createContext<ContextType>(getDefaultValue())

export const useGlobalContext: () => ContextType = () => useContext(GlobalContext)

export const GlobalContextProvider = ({children}: { children: ReactNode | ReactNode[] }) => {
    const defaultValue = useMemo(() => getDefaultValue(), [])
    const [persons, setPersons] = useState<PersonType[]>(defaultValue.persons || [])
    const [tags, setTags] = useState<TagType[]>(defaultValue.tags || [])
    const [revenues, setRevenues] = useState<RevenueType[]>(defaultValue.revenues || [])
    const [expenses, setExpenses] = useState<ExpenseType[]>(defaultValue.expenses || [])

    const value: ContextType = useMemo(() => ({
        persons,
        setPersons,
        tags,
        setTags,
        revenues,
        setRevenues,
        expenses,
        setExpenses
    }), [persons, setPersons, tags, setTags, revenues, setRevenues, expenses, setExpenses])

    useEffect(() => {
        localStorage.setItem('context', JSON.stringify(value))
    }, [value])

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}

