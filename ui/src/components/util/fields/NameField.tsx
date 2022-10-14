import {Control} from "react-hook-form";
import {TextFormField} from "../form/TextFormField";

interface Props {
    control: Control,
    name?: string,
    label?: string
}

export const NameField = (props: Props) => {
    const {control, name, label} = props
    return (
        <TextFormField
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