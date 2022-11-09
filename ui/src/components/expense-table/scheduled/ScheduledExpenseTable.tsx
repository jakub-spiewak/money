import {ScheduledExpenseResponse} from "../../../redux/generated/redux-api";
import {ExpenseTableProps} from "../types";
import {DynamicTable} from "../../util/dynamic-table/DynamicTable";

export const ScheduledExpenseTable = (props: ExpenseTableProps<ScheduledExpenseResponse> & { currentExpense?: string }) => {
    const {isLoading, items} = props

    return (
        <DynamicTable
            data={items}
            resourceType={"SCHEDULED_EXPENSE"}
        />
    )
}