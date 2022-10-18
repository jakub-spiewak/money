import {HStack} from "@chakra-ui/react";
import {AmountRangeField} from "./amount/AmountRangeField";
import {useWatch} from "react-hook-form";
import {AmountTypeField} from "./AmountTypeField";
import {useMemo} from "react";
import {AmountField} from "./amount/AmountField";
import {AmountConstantField} from "./amount/AmountConstantField";
import {AmountPercentageField} from "./amount/AmountPercentageField";
import {FieldProps} from "./types";

export const TypedAmountField = (props: FieldProps) => {
    const {control, name, label} = props

    const currentType = useWatch({control})?.amount?.type

    const Input = useMemo(() => {
        if (currentType === "CONSTANT") return AmountConstantField
        else if (currentType === "RANGE") return AmountRangeField
        else if (currentType === "PERCENTAGE") return AmountPercentageField
        else return AmountField
    }, [currentType])

    return (
        <HStack
            justifyContent={"end"}
            alignItems={"end"}
        >
            <Input
                control={control}
                name={name}
                label={label}
            />
            <AmountTypeField control={control}/>
        </HStack>
    )
}