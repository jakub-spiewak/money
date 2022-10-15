import {FieldProps} from "./types";
import {DateFormField} from "../form/DateFormField";

export const DateField = (props: FieldProps) => {
    const {control, name, label} = props
    return (
        <DateFormField
            control={control}
            name={name || "date"}
            label={label || "Date"}
            rules={{
                required: 'This is required',
            }}
        />
    )
}