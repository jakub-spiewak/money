import {Control} from "react-hook-form";

export interface FieldProps {
    control: Control<any, any>,
    name?: string,
    label?: string
}