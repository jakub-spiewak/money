import {useState} from "react";
import {useSearchParams} from "react-router-dom";

export type FormModalValueType<T> = {
    request: T,
    id: string
}

export type FormModalStateType<T> = {
    isOpen: boolean,
    value?: FormModalValueType<T>,
    open: (value?: FormModalValueType<T>) => void,
    close: () => void
}

export function useFormModalStateType<T>(): FormModalStateType<T> {
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

const MONTH_SEARCH_PARAM_NAME = "month"


export const useMonthSearchParams = (): [string | undefined, (v: string) => void] => {
    const [params, setParams] = useSearchParams()

    const today = new Date()

    const setMonthSearchParam = (v: string) => {
        params.set(MONTH_SEARCH_PARAM_NAME, v)
        setParams(params)
    }

    // const extractDate = (value: string): { year: number, month: number } | null => {
    //     const month = Number(value.substring(0, 2))
    //     const year = Number(value.substring(3, 7))
    //     if (isNaN(month) || isNaN(year)) return null
    //     return {month, year}
    // }

    const currentMonth = params.get(MONTH_SEARCH_PARAM_NAME)
    if (currentMonth && currentMonth.length !== 7) {
        params.set(MONTH_SEARCH_PARAM_NAME, `${today.getFullYear()}-${today.getMonth()}`)
    }

    // const extractedDate = extractDate(currentMonth || "")

    return [currentMonth || undefined, setMonthSearchParam]
}