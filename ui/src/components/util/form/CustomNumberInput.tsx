import {chakra, Input, StyledStepper, useMultiStyleConfig} from "@chakra-ui/react";
import {TriangleDownIcon, TriangleUpIcon} from "@chakra-ui/icons";
import {
    CSSProperties,
    ReactNode,
    useEffect,
} from "react";
import {useCustomNumberInput} from "./number-input-hook";
import {FieldError} from "react-hook-form";

interface NumberStepperProps {
    increment?: () => void,
    decrement?: () => void
}

const NumberStepper = (props: NumberStepperProps) => {
    const styles = useMultiStyleConfig("NumberInput", {})

    return (
        <NumberInputStepper>
            <StyledStepper __css={styles.stepper}>
                <TriangleUpIcon onClick={props?.increment}/>
            </StyledStepper>
            <StyledStepper
                px={1}
                __css={styles.stepper}
            >
                <TriangleDownIcon onClick={props?.decrement}/>
            </StyledStepper>
        </NumberInputStepper>
    )
}

const NumberInputStepper = (props: { children: ReactNode }) => {
    const styles = useMultiStyleConfig("NumberInput", {})
    return (
        <chakra.div
            aria-hidden
            {...props}
            __css={{
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                top: "0",
                insetEnd: "0px",
                margin: "1px",
                height: "calc(100% - 2px)",
                zIndex: 1,
                ...styles.stepperGroup,
            }}
        />
    )
}

interface CustomNumberInputProps {
    onChange?: (event: string | number) => void,
    onBlur?: () => void,
    value: number | string,
    inputStyle?: CSSProperties,
    containerStyle?: CSSProperties,
    placeholder?: string,
    error?: FieldError,
    min?: number,
    max?: number,
    inputSuffix?: string
}

export const CustomNumberInput = (props: CustomNumberInputProps) => {
    const {onBlur, onChange, inputSuffix, inputStyle, containerStyle, placeholder, value, error, max, min} = props

    const numberInput = useCustomNumberInput({min, value, max})

    useEffect(() => {
        onChange?.(numberInput.value)
    }, [numberInput.value, onChange])

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                marginInline: 0,
                ...containerStyle,
            }}
            onBlur={onBlur}
        >
            <Input
                isInvalid={!!error}
                style={inputStyle}
                onWheel={numberInput.wheelHandler}
                onKeyDown={numberInput.keyDownHandler}
                onChange={numberInput.changeHandler}
                onBlur={numberInput.blurHandler}
                value={`${numberInput.value}${inputSuffix || ''}`}
                inputMode={"decimal"}
                placeholder={placeholder}
            />
            <NumberStepper {...numberInput.stepper}/>
        </div>
    )
}