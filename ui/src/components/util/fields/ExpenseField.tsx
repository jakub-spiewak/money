import {useReadScheduledExpenseQuery} from "../../../redux/generated/redux-api";
import {FieldProps} from "./types";
import {SelectFormField} from "../controls/SelectFormField";

interface ExpenseFieldProps extends FieldProps {
    defaultValue?: string
}

export const ExpenseField = (props: ExpenseFieldProps) => {
    const {control, name, label, defaultValue} = props
    const {data} = useReadScheduledExpenseQuery()

    return (
        <SelectFormField
            name={name || "expense"}
            control={control}
            label={label || "Expense"}
            defaultValue={defaultValue}
        >
            {data?.map((expense, index) => (
                <option
                    key={`expense_option_${index}`}
                    value={expense.id}
                >
                    {expense.name}
                    {' - '}
                    {expense.amount?.data?.value?.toLocaleString(undefined, {minimumFractionDigits: 2})}
                </option>
            ))}
        </SelectFormField>
    )
}