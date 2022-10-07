import {createContext, ReactNode, useContext, useEffect, useMemo, useState} from "react";
import {PersonType} from "./CommonTypes";

interface ContextType {
    persons: PersonType[],
    setPersons: (persons: PersonType[]) => void
}

const getDefaultValue = (): ContextType => {
    const storageContext = localStorage.getItem('context')
    if (storageContext) {
        return JSON.parse(storageContext) as ContextType
    }
    return {
        persons: [],
        setPersons: () => {
        }
    }
}
const GlobalContext = createContext<ContextType>(getDefaultValue())

export const useGlobalContext: () => ContextType = () => useContext(GlobalContext)

export const GlobalContextProvider = ({children}: { children: ReactNode | ReactNode[] }) => {
    const defaultValue = useMemo(() => getDefaultValue(), [])
    const [persons, setPersons] = useState<PersonType[]>(defaultValue.persons)

    const value: ContextType = useMemo(() => ({persons, setPersons}), [persons, setPersons])

    useEffect(() => {
        localStorage.setItem('context', JSON.stringify(value))
    }, [value])

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}

