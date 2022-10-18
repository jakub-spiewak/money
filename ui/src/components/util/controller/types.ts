import type {Control, RegisterOptions} from "react-hook-form";


export interface FormControllerProps {
    name: string,
    label: string,
    control: Control,
    rules?: RegisterOptions,
    defaultValue?: any
}
