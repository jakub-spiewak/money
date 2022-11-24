import {useReadScheduledRevenueQuery} from "../../../redux/generated/redux-api";
import {FieldProps} from "./types";
import {SelectFormController} from "../controller/SelectFormController";
import {getAmountString} from "../../../utils/util";

interface ExpenseFieldProps extends FieldProps {
    defaultValue?: string
}

export const RevenueField = (props: ExpenseFieldProps) => {
    const {control, name, label, defaultValue} = props
    const {data} = useReadScheduledRevenueQuery({})

    if (!data) return null

    return (
        <SelectFormController
            name={name || "revenue"}
            control={control}
            label={label || "Revenue"}
            defaultValue={defaultValue}
        >
            {data?.map((revenue, index) => (
                <option
                    key={`expense_option_${index}`}
                    value={revenue.id}
                >
                    {`${revenue.name} (${getAmountString(revenue.amount)})`}
                </option>
            ))}
        </SelectFormController>
    )
}