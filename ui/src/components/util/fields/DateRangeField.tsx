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
    control: Control<any>
}

export const DateRangeField = (props: DateRangeFieldProps) => {
    const {control, name, label} = props
    const fromValue = useWatch({name: name?.from || 'date.from', control})
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
                rules={{
                    validate: value => {
                        if (!fromValue || !value) return true
                        const fromDate = new Date(fromValue)
                        const toDate = new Date(value)

                        let months = (toDate.getFullYear() - fromDate.getFullYear()) * 12
                        months -= fromDate.getMonth()
                        months += toDate.getMonth()

                        if (months === 1 && fromDate.getDay() - toDate.getDay() > 0) return "Dates should have at least one month break1"
                        if (months < 1) return "Dates should have at least one month break"

                        return true
                    }
                }}
            />
        </HStack>
    )
}