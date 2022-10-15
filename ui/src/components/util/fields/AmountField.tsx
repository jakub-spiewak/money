import {NumberFormField} from "../form/NumberFormField";
import {FieldProps} from "./types";

export const AmountField = (props: FieldProps) => {
    const {control, name, label} = props
    return (
        <NumberFormField
            control={control}
            name={name || "amount"}
            label={label || "Amount"}
            rules={{
                required: 'This is required',
                min: {value: 0.01, message: 'Should be more than 0.00'}
            }}
        />
    )
}