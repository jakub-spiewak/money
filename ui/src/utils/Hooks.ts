import {useState} from "react";

export type FormModalValueType<T> = {
    request: T,
    id: string
}

type UseFormModalStateType<T> = {
    isOpen: boolean,
    value?: FormModalValueType<T>,
    open: (value?: FormModalValueType<T>) => void,
    close: () => void
}

export function useFormModalStateType<T>(): UseFormModalStateType<T> {
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState<FormModalValueType<T>>()

    const open = (value?: FormModalValueType<T>) => {
        setValue(value)
        setIsOpen(true)
    }

    const close = () => {
        setValue(undefined)
        setIsOpen(false)
    }

    return {
        isOpen,
        value,
        open,
        close
    }
}