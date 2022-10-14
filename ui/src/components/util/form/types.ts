import type {Control, RegisterOptions} from "react-hook-form";

export interface FormFieldProps {
    name: string,
    label: string,
    control: Control,
    rules?: RegisterOptions
}
