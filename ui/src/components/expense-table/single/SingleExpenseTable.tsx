import {SingleExpenseResponse} from "../../../redux/generated/redux-api";
import {ExpenseTableProps} from "../types";
import {DynamicTable} from "../../util/dynamic-table/DynamicTable";

export const SingleExpenseTable = (props: ExpenseTableProps<SingleExpenseResponse> & { onExpenseClick?: (id: string) => void, }) => {

    const {isLoading, items} = props

    return (
        <DynamicTable
            data={items}
            resourceType={"SINGLE_EXPENSE"}
        />
    )
}