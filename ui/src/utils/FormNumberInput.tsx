import {
    ChangeEventHandler,
    FC, FocusEventHandler,
    ForwardedRef,
    forwardRef,
    ForwardRefExoticComponent,
    InputHTMLAttributes,
    RefAttributes, useEffect,
    useMemo
} from "react"
import {
    Button, HStack, Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper, useBreakpointValue, useNumberInput
} from "@chakra-ui/react"
import { UseFormGetValues, UseFormSetValue} from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    wrapper: {
        defaultValue?: number,
        min?: number,
        max?: number,
        getValues: UseFormGetValues<any>,
        setValue: UseFormSetValue<any>
    }
    name: string
}

type NumberInputComponentType = ForwardRefExoticComponent<Props & RefAttributes<HTMLInputElement>>

const DesktopNumberInput: NumberInputComponentType = forwardRef<HTMLInputElement, Props>((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
        const {getValues, min, max} = props.wrapper
        const propsWithoutWrapper = {...props, wrapper: undefined}
        const value = getValues(props.name)

        return (
            <NumberInput
                defaultValue={value}
                min={min}
                max={max}
                placeholder={props.placeholder}
                precision={2}
                step={0.01}
            >
                <NumberInputField
                    {...propsWithoutWrapper} ref={ref}
                />
                <NumberInputStepper>
                    <NumberIncrementStepper/>
                    <NumberDecrementStepper/>
                </NumberInputStepper>
            </NumberInput>
        )
    }
)

const MobileNumberInput: NumberInputComponentType = forwardRef<HTMLInputElement, Props>((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
        const {min, max, getValues, setValue} = props.wrapper
        const propsWithoutWrapper = {...props, wrapper: undefined}

        const wrapperValue = getValues(props.name)

        const {getInputProps, getIncrementButtonProps, getDecrementButtonProps, value} =
            useNumberInput({
                step: 0.01,
                defaultValue: wrapperValue,
                min,
                max,
                precision: 2,
            })

        const inc = getIncrementButtonProps()
        const dec = getDecrementButtonProps()
        const input = getInputProps()

        const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
            props.onChange?.(event)
            input.onChange?.(event)
        }

        const onBlur: FocusEventHandler<HTMLInputElement> = (event) => {
            props.onBlur?.(event)
            input.onBlur?.(event)
        }

        const onFocus: FocusEventHandler<HTMLInputElement> = (event) => {
            input.onFocus?.(event)
            props.onFocus?.(event)
        }

        useEffect(() => {
            setValue(props.name || '', value)
        }, [setValue, props.name, value])

        return (
            <HStack>
                <Button {...inc}>+</Button>
                {/*@ts-ignore*/}
                <Input {...propsWithoutWrapper} onChange={onChange}
                       onBlur={onBlur}
                       onFocus={onFocus}
                       value={value}
                       type={'number'}
                       inputMode={'decimal'}
                       ref={ref}
                />
                <Button {...dec}>-</Button>
            </HStack>
        )
    }
)


export const FormNumberInput: FC<Props> = forwardRef<HTMLInputElement, Props>((props, ref) => {
    const isMobile = useBreakpointValue({base: true, md: false}, {fallback: 'md'})

    const InputComponent = useMemo(() => isMobile ? MobileNumberInput : DesktopNumberInput, [isMobile])

    return <InputComponent ref={ref} {...props}/>
})
