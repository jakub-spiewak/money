import {FormFieldProps} from "./types";
import {FormControl, FormErrorMessage, FormLabel, Select} from "@chakra-ui/react";
import {Controller} from "react-hook-form";
import {ReactNode} from "react";

interface Props extends FormFieldProps {
    children?: ReactNode | ReactNode[]
}

export const SelectFormField = (props: Props) => {
    const {label, name, rules, control, defaultValue, children} = props
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({
                         field: {
                             value, ref, onBlur, onChange
                         },
                         fieldState: {error}
                     }) => (
                <FormControl
                    mt={4}
                    isInvalid={!!error}
                >
                    <FormLabel>{label}</FormLabel>
                    <Select
                        ref={ref}
                        placeholder={label}
                        defaultValue={defaultValue}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                    >
                        {children}
                    </Select>
                    <FormErrorMessage>
                        {error && error.message}
                    </FormErrorMessage>
                </FormControl>
            )}
        />
    )
}