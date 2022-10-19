import {NumberFormController} from "../../controller/NumberFormController";
import {FieldProps} from "../types";

export const AmountField = (props: FieldProps) => {
    const {control, name, label} = props
    return (
        <NumberFormController
            control={control}
            name={name || "amount"}
            label={label || "Amount"}
            rules={{
                required: 'This is required',
                min: {value: 0.01, message: 'Should be more than 0.00'},
                shouldUnregister: true
            }}
        />
    )
}