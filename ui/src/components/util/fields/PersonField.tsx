import {SelectFormField} from "../form/SelectFormField";
import {useReadPersonQuery} from "../../../redux/generated/redux-api";
import {FieldProps} from "./types";

interface Props extends FieldProps{
    required?: boolean
}

export const PersonField = (props: Props) => {
    const {control, name, label, required} = props
    const {data: persons = []} = useReadPersonQuery()

    return (
        <SelectFormField
            control={control}
            name={name || "personId"}
            label={label || "Person"}
            rules={{
                required: required ? 'This is required' : undefined
            }}
        >
            {
                persons.map((person, index) => (
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