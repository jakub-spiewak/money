import {Control} from "react-hook-form";
import {NumberFormField} from "../form/NumberFormField";

interface Props {
    control: Control,
    name?: string,
    label?: string
}

export const AmountField = (props: Props) => {
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