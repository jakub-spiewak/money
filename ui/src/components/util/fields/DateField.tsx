import {FieldProps} from "./types";
import {DateFormController} from "../controller/DateFormController";

export const DateField = (props: FieldProps) => {
    const {control, name, label} = props
    return (
        <DateFormController
            control={control}
            name={name || "date"}
            label={label || "Date"}
            rules={{
                required: 'This is required',
            }}
        />
    )
}