import {
    HStack,
    FormControl,
    FormLabel, FormErrorMessage
} from "@chakra-ui/react";
import {Controller, FieldError} from "react-hook-form";
import {FieldProps} from "./types";
import {CustomNumberInput} from "../form/CustomNumberInput";
import {useState} from "react";


export const AmountRangeField = (props: FieldProps) => {
    const {control, name, label} = props
    const [minError, setMinError] = useState<FieldError>()
    const [maxError, setMaxError] = useState<FieldError>()
    const [minValue, setMinValue] = useState<string>()

    return (
        <FormControl
            pt={4}
            isInvalid={!!(minError || maxError)}
        >
            <FormLabel>{label || "Amount"}</FormLabel>
            <HStack>
                <Controller
                    name={`${name || 'amount'}.data.min`}
                    control={control}
                    rules={{
                        required: 'This is required',
                        min: {value: 0.01, message: 'Should be more than 0.00'},
                    }}
                    render={({field, fieldState}) => {
                        const {value, onBlur, onChange} = field
                        const {error} = fieldState

                        setMinError(error)
                        setMinValue(value)

                        return (
                            <CustomNumberInput
                                onBlur={onBlur}
                                onChange={onChange}
                                value={value}
                                placeholder={"From"}
                                inputStyle={{
                                    borderTopRightRadius: 0,
                                    borderBottomRightRadius: 0,
                                }}
                                error={error}
                            />
                        )
                    }}
                />
                <Controller
                    name={`${name || 'amount'}.data.max`}
                    control={control}
                    rules={{
                        required: 'This is required',
                        min: {value: 0.01, message: 'Should be more than 0.00'},
                        validate: value => {
                            if (Number(value) < Number(minValue)) return 'Max value should be more than min value'
                            return true
                        }
                    }}
                    render={({field, fieldState}) => {
                        const {value, onBlur, onChange} = field
                        const {error} = fieldState

                        setMaxError(error)

                        return (
                            <CustomNumberInput
                                onBlur={onBlur}
                                onChange={onChange}
                                value={value}
                                placeholder={"To"}
                                inputStyle={{
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                }}
                                error={error}
                            />
                        )
                    }}
                />
            </HStack>
            <FormErrorMessage>{minError?.message || maxError?.message}</FormErrorMessage>
        </FormControl>
    )
}