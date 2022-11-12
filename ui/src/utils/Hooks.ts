import {useEffect, useState} from "react";

export const useMinTimeChange = (val: any, time: number) => {
    const [value, setValue] = useState()
    const [isChanging, setIsChanging] = useState(false)

    useEffect(() => {
        if (isChanging) return

        setIsChanging(true)
        setValue(val)

        const timeoutId = setTimeout(() => {
            setIsChanging(false)
            setValue(val)
        }, time)
        return () => {
            clearTimeout(timeoutId)
        }
    }, [isChanging, val])
    return value
}