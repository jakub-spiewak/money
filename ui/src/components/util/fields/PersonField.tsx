import {Control} from "react-hook-form";
import {SelectFormField} from "../form/SelectFormField";
import {useReadPersonQuery} from "../../../redux/generated/redux-api";

interface Props {
    control: Control,
    name?: string,
    label?: string
}

export const PersonField = (props: Props) => {
    const {control, name, label} = props
    const {data: persons = []} = useReadPersonQuery()

    return (
        <SelectFormField
            control={control}
            name={name || "personId"}
            label={label || "Person"}
            rules={{
                required: 'This is required'
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