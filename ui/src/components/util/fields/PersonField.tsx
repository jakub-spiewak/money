import {SelectFormField} from "../form/SelectFormField";
import {useReadPersonQuery} from "../../../redux/generated/redux-api";
import {FieldProps} from "./types";

interface Props extends FieldProps {
    required?: boolean,
    defaultValue?: string
}

export const PersonField = (props: Props) => {
    const {control, name, label, required, defaultValue} = props
    const {data: persons} = useReadPersonQuery()

    return (
        <SelectFormField
            control={control}
            name={name || "person"}
            label={label || "Person"}
            defaultValue={defaultValue}
            rules={{
                required: required ? 'This is required' : undefined,
            }}
        >
            {
                persons?.map((person, index) => (
                    <option
                        key={`person_option_${index}`}
                        value={person.id}
                    >
                        {`${person.firstName} ${person.lastName}`}
                    </option>
                ))
            }
        </SelectFormField>
    )
}