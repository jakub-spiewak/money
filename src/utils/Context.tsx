import {createContext, ReactNode, useContext, useEffect, useMemo, useState} from "react";
import {PersonType, RevenueType, TagType} from "./CommonTypes";

interface ContextType {
    persons: PersonType[],
    setPersons: (persons: PersonType[]) => void,
    tags: TagType[],
    setTags: (tags: TagType[]) => void,
    revenues: RevenueType[],
    setRevenues: (revenues: RevenueType[]) => void
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

    const value: ContextType = useMemo(() => ({
        persons,
        setPersons,
        tags,
        setTags,
        revenues,
        setRevenues
    }), [persons, setPersons, tags, setTags, revenues, setRevenues])

    useEffect(() => {
        localStorage.setItem('context', JSON.stringify(value))
    }, [value])

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}

