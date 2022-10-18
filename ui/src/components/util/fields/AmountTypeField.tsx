import {Controller} from "react-hook-form";
import {AmountTypeSelect} from "./amount/AmountTypeSelect";
import {FieldProps} from "./types";

export const AmountTypeField = (props: FieldProps) => {
    const {control, name} = props

    return (
        <Controller
            name={`${name ? name : 'amount'}.type`}
            control={control}
            render={({field}) => {
                const {value, onChange, onBlur} = field
                return (
                    <AmountTypeSelect
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                )
            }}
        />
    )
}