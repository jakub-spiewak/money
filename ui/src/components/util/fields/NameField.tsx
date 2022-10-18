import {TextFormController} from "../controller/TextFormController";
import {FieldProps} from "./types";

export const NameField = (props: FieldProps) => {
    const {control, name, label} = props
    return (
        <TextFormController
            control={control}
            name={name || "name"}
            label={label || "Name"}
            rules={{
                required: 'This is required',
                minLength: {value: 4, message: 'Minimum length should be 4'},
                maxLength: {value: 32, message: 'Maximum length should be 32'}
            }}
        />
    )
}