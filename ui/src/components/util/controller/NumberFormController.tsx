import {
    ChangeEventHandler,
    FC, FocusEventHandler,
    forwardRef,
    KeyboardEventHandler,
    KeyboardEvent,
    useMemo, useCallback, RefAttributes, ForwardRefExoticComponent, useEffect, useState
} from "react"
import {
    Button, FormControl, FormErrorMessage, FormLabel, HStack, Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper, useBreakpointValue, useCounter,
} from "@chakra-ui/react"
import {Controller} from "react-hook-form";
import {FormControllerProps} from "./types";

const FLOATING_POINT_REGEX = /^[0-9.,]$/
const FLOATING_POINT_SEPARATORS = [",", "."]


interface NumberInputProps {
    name: string,
    onChange: (value: any) => void,
    onBlur: () => void,
    value: number,
    min?: number,
    max?: number,
    placeholder?: string
}

type NumberInputComponentType = ForwardRefExoticComponent<NumberInputProps & RefAttributes<HTMLInputElement>>

const isValidNumericKeyboardEvent = (event: KeyboardEvent): boolean => {
    if (event.key == null) return true
    const isModifierKey = event.ctrlKey || event.altKey || event.metaKey
    const isSingleCharacterKey = event.key.length === 1
    if (!isSingleCharacterKey || isModifierKey) return true

    return FLOATING_POINT_REGEX.test(event.key)
};

const DesktopNumberInput: NumberInputComponentType = forwardRef((props, ref) => {
        const {value, onBlur, onChange, max, min, placeholder, name} = props

        return (
            <NumberInput
                min={min}
                max={max}
                allowMouseWheel
                precision={2}
                step={0.01}
                defaultValue={value}
                onChange={(valueAsString) => onChange(valueAsString)}
            >
                <NumberInputField
                    ref={ref}
                    name={name}
                    value={value}
                    onBlur={onBlur}
                    placeholder={placeholder}
                />
                <NumberInputStepper>
                    <NumberIncrementStepper/>
                    <NumberDecrementStepper/>
                </NumberInputStepper>
            </NumberInput>
        )
    }
)

const MobileNumberInput: NumberInputComponentType = forwardRef((props, ref) => {

    const counter = useCounter({
        precision: 2,
        min: props.min,
        max: props.max,
        defaultValue: props.value
    })

    const onChangeFromProps = props.onChange
    const onBlurFromProps = props.onBlur

    const {
        increment: incrementFn,
        decrement: decrementFn,
    } = counter

    const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        const {target: {value: valueFromEvent}} = event
        const evt = event.nativeEvent as InputEvent
        if (evt.isComposing) return

        counter.update(valueFromEvent)
    }, [counter])

    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback((event) => {
        if (event.nativeEvent.isComposing) return

        if (!isValidNumericKeyboardEvent(event)) {
            event.preventDefault()
        }
        const eventKey = event.key

        if ((counter.value.toString().includes(".") || counter.value.toString().includes(",")) && FLOATING_POINT_SEPARATORS.includes(eventKey)) {
            event.preventDefault()
        }

        const keyMap: Record<string, KeyboardEventHandler> = {
            ArrowUp: () => incrementFn(.01),
            ArrowDown: () => decrementFn(.01),
        }

        const action = keyMap[eventKey]

        if (action) {
            event.preventDefault()
            action(event)
        }
    }, [counter.value, decrementFn, incrementFn])

    const onBlur: FocusEventHandler<HTMLInputElement> = useCallback(() => {
        onBlurFromProps()
        let value = counter.value

        if (typeof value === "string") value = value.replace(",", ".")
        if (value !== "") counter.update(counter.clamp(Number(value)))
    }, [counter, onBlurFromProps])

    const [init, setInit] = useState(false)
    useEffect(() => {
        if (init) onChangeFromProps(counter.value)
        else if (counter.value !== "") setInit(true)
    }, [counter, init, onChangeFromProps])

    return (
        <HStack>
            <Button
                disabled={counter.isAtMax}
                onClick={() => incrementFn(.01)}
            >+</Button>
            <Input
                ref={ref}
                inputMode={"decimal"}
                defaultValue={props.value}
                value={counter.value}
                onChange={onChange}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                placeholder={props.placeholder}
            />
            <Button
                disabled={counter.isAtMin}
                onClick={() => decrementFn(.01)}
            >-</Button>
        </HStack>
    )
})


export const NumberFormController: FC<FormControllerProps> = (props) => {
    const {control, name, label, rules} = props
    const isMobile = useBreakpointValue({base: true, md: false}, {fallback: 'md'})

    const InputComponent: NumberInputComponentType = useMemo(() => isMobile ? MobileNumberInput : DesktopNumberInput, [isMobile])

    const min: number | undefined = useMemo(() => {
        if (rules?.min === undefined) return
        if (typeof rules.min === 'number') return rules.min
        if (typeof rules.min !== "string" && typeof rules.min.value === 'number') return rules.min.value
    }, [rules?.min])

    const max: number | undefined = useMemo(() => {
        if (rules?.max === undefined) return
        if (typeof rules.max === 'number') return rules.max
        if (typeof rules.max !== "string" && typeof rules.max.value === 'number') return rules.max.value
    }, [rules?.max])


    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({field: {ref, value, onBlur, onChange, name}, fieldState: {error}}) => (
                <FormControl
                    isInvalid={!!error}
                    mt={4}
                >
                    <FormLabel>{label}</FormLabel>
                    <InputComponent
                        name={name}
                        ref={ref}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        max={max}
                        min={min}
                        placeholder={label}
                    />
                    <FormErrorMessage>
                        {error?.message}
                    </FormErrorMessage>
                </FormControl>
            )}
        />
    )
}
