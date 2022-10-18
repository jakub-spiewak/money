import {FormControllerProps} from "./types";
import {FormControl, FormErrorMessage, FormLabel, Input} from "@chakra-ui/react";
import {Controller} from "react-hook-form";

export const TextFormController = (props: FormControllerProps) => {
    const {label, name, rules, control} = props
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
                    <Input
                        ref={ref}
                        placeholder={label}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                    >
                    </Input>
                    <FormErrorMessage>
                        {error && error.message}
                    </FormErrorMessage>
                </FormControl>
            )}
        />
    )
}
