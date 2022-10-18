import {
    ChangeEventHandler,
    FocusEventHandler,
    KeyboardEventHandler,
    KeyboardEvent,
    useCallback,
    WheelEventHandler
} from "react";
import {useCounter} from "@chakra-ui/react";

interface UseCustomNumberInputResult {
    blurHandler: FocusEventHandler<HTMLInputElement>,
    keyDownHandler: KeyboardEventHandler<HTMLInputElement>,
    changeHandler: ChangeEventHandler<HTMLInputElement>,
    wheelHandler: WheelEventHandler<HTMLInputElement>,
    value: string | number,
    isAtMin: boolean,
    isAtMax: boolean,
    stepper: {
        increment: () => void,
        decrement: () => void
    }
}

interface UseCustomNumberInputPropsArgs {
    min?: number,
    max?: number,
    value?: number | string
}

const FLOATING_POINT_REGEX = /^[0-9.,]$/
const FLOATING_POINT_SEPARATORS = [",", "."]
const PRECISION = .01;

const isValidNumericKeyboardEvent = (event: KeyboardEvent): boolean => {
    if (event.key == null) return true
    const isModifierKey = event.ctrlKey || event.altKey || event.metaKey
    const isSingleCharacterKey = event.key.length === 1
    if (!isSingleCharacterKey || isModifierKey) return true

    return FLOATING_POINT_REGEX.test(event.key)
};

export const useCustomNumberInput = (args?: UseCustomNumberInputPropsArgs): UseCustomNumberInputResult => {

    const {increment, decrement, value, update, isAtMin, isAtMax, clamp} = useCounter({
        min: args?.min,
        max: args?.max,
        precision: 2,
        defaultValue: args?.value
    })

    const blurHandler: FocusEventHandler<HTMLInputElement> = useCallback(() => {
        let result = value
        if (typeof value === "string") result = value.replace(",", ".")
        if (result !== "") update(clamp(Number(result)))
    }, [clamp, update, value])

    const keyDownHandler: KeyboardEventHandler<HTMLInputElement> = useCallback((event) => {
        if (event.nativeEvent.isComposing) return

        if (!isValidNumericKeyboardEvent(event)) {
            event.preventDefault()
        }
        const eventKey = event.key

        if ((value.toString().includes(".") || value.toString().includes(",")) && FLOATING_POINT_SEPARATORS.includes(eventKey)) {
            event.preventDefault()
        }

        const keyMap: Record<string, KeyboardEventHandler> = {
            ArrowUp: () => increment(PRECISION),
            ArrowDown: () => decrement(PRECISION),
        }

        const action = keyMap[eventKey]

        if (action) {
            event.preventDefault()
            action(event)
        }
    }, [decrement, increment, value])

    const changeHandler: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        const {target: {value: valueFromEvent}} = event
        const evt = event.nativeEvent as InputEvent
        if (evt.isComposing) return

        update(valueFromEvent)
    }, [update])

    const wheelHandler: WheelEventHandler<HTMLInputElement> = useCallback((event) => {
        if (event.deltaY < 0) {
            increment(PRECISION)
        } else {
            decrement(PRECISION)
        }
    }, [decrement, increment])

    return {
        blurHandler,
        keyDownHandler,
        changeHandler,
        wheelHandler,
        value,
        isAtMax,
        isAtMin,
        stepper: {
            increment: () => increment(PRECISION),
            decrement: () => decrement(PRECISION),
        }
    }
}
