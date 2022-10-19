import {DateFormController} from "../controller/DateFormController";
import {HStack} from "@chakra-ui/react";
import {Control, useWatch} from "react-hook-form";

interface DateRangeFieldProps {
    label?: {
        from?: string,
        to?: string
    },
    name?: {
        from?: string,
        to?: string
    },
    control: Control
}

export const DateRangeField = (props: DateRangeFieldProps) => {
    const {control, name, label} = props
    const toValue = useWatch({name: name?.to || 'date.to', control})

    return (
        <HStack alignItems={"end"}>
            <DateFormController
                control={control}
                name={name?.from || "date.from"}
                label={label?.from || "From"}
                rules={{
                    validate: value => {
                        if (!toValue || !value) return true
                        const dateDiff = new Date(toValue).getTime() - new Date(value).getTime()
                        if (dateDiff < 0) return "From date should be before 'To' date"

                        return true
                    }
                }}
            />
            <DateFormController
                control={control}
                name={name?.to || "date.to"}
                label={label?.to || "To"}
            />
        </HStack>
    )
}