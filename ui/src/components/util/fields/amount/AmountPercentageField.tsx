import {
    HStack,
    FormControl,
    FormLabel, FormErrorMessage
} from "@chakra-ui/react";
import {Controller, FieldError} from "react-hook-form";
import {FieldProps} from "../types";
import {CustomNumberInput} from "../../form/CustomNumberInput";
import {useState} from "react";


export const AmountPercentageField = (props: FieldProps) => {
    const {control, name, label} = props
    const [valueError, setValueError] = useState<FieldError>()
    const [percentageError, setPercentageError] = useState<FieldError>()

    return (
        <FormControl
            pt={4}
            isInvalid={!!(valueError || percentageError)}
        >
            <FormLabel>{label || "Amount"}</FormLabel>
            <HStack>
                <Controller
                    name={`${name || 'amount'}.data.value`}
                    control={control}
                    rules={{
                        required: 'This is required',
                        min: {value: 0.01, message: 'Should be more than 0.00'},
                        shouldUnregister: true
                    }}
                    render={({field, fieldState}) => {
                        const {value, onBlur, onChange} = field
                        const {error} = fieldState

                        setValueError(error)

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
                                containerStyle={{
                                    width: "70%"
                                }}
                                error={error}
                            />
                        )
                    }}
                />
                <Controller
                    name={`${name || 'amount'}.data.percentage`}
                    control={control}
                    rules={{
                        required: 'This is required',
                        min: {value: 0.01, message: 'Should be more than 0.00%'},
                        max: {value: 100.0, message: 'Should be less than 100.00%'},
                    }}
                    render={({field, fieldState}) => {
                        const {value, onBlur, onChange} = field
                        const {error} = fieldState

                        setPercentageError(error)

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
                                containerStyle={{
                                    width: "30%"
                                }}
                                error={error}
                                min={0}
                                max={100.0}
                            />
                        )
                    }}
                />
            </HStack>
            <FormErrorMessage>{valueError?.message || percentageError?.message}</FormErrorMessage>
        </FormControl>
    )
}