import {useReadScheduledExpenseQuery} from "../../../redux/generated/redux-api";
import {FieldProps} from "./types";
import {SelectFormController} from "../controller/SelectFormController";
import {AmountTableCell} from "../table/AmountTableCell";

interface ExpenseFieldProps extends FieldProps {
    defaultValue?: string
}

export const ExpenseField = (props: ExpenseFieldProps) => {
    const {control, name, label, defaultValue} = props
    const {data} = useReadScheduledExpenseQuery()

    return (
        <SelectFormController
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
                    <span> (</span>
                    <AmountTableCell amount={expense.amount}/>
                    <span>)</span>
                </option>
            ))}
        </SelectFormController>
    )
}