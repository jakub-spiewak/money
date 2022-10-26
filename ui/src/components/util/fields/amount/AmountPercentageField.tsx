import {FormControl, FormErrorMessage, FormLabel, HStack} from "@chakra-ui/react";
import {Controller, useFormState} from "react-hook-form";
import {FieldProps} from "../types";
import {CustomNumberInput} from "../../form/CustomNumberInput";


export const AmountPercentageField = (props: FieldProps) => {
    const {control, name = 'amount', label = "Amount"} = props

    const {errors} = useFormState({control, name: `${name}.data`})

    return (
        <FormControl
            pt={4}
            // @ts-ignore
            isInvalid={!!errors[name]?.data}
        >
            <FormLabel>{label}</FormLabel>
            <HStack>
                <Controller
                    name={`${name}.data.value`}
                    control={control}
                    rules={{
                        required: 'This is required',
                        min: {value: 0.01, message: 'Should be more than 0.00'},
                        shouldUnregister: true
                    }}
                    render={({field, fieldState}) => {
                        const {value, onBlur, onChange} = field
                        const {error} = fieldState

                        return (
                            <CustomNumberInput
                                onBlur={onBlur}
                                onChange={onChange}
                                value={value}
                                placeholder={"Amount"}
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
                    name={`${name}.data.percentage`}
                    control={control}
                    rules={{
                        required: 'This is required',
                        min: {value: 0.01, message: 'Should be more than 0.00%'},
                        max: {value: 100.0, message: 'Should be less than 100.00%'},
                    }}
                    render={({field, fieldState}) => {
                        const {value, onBlur, onChange} = field
                        const {error} = fieldState

                        return (
                            <CustomNumberInput
                                onBlur={onBlur}
                                onChange={onChange}
                                value={value}
                                placeholder={"%"}
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
            {/*@ts-ignore*/}
            <FormErrorMessage>{errors[name]?.data?.percentage?.message || errors[name]?.data?.value?.message}</FormErrorMessage>
        </FormControl>
    )
}