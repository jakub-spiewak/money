import {SingleRevenueResponse} from "../../../redux/generated/redux-api";
import {SimpleTableProps} from "../../util/table/types";
import {DynamicTable} from "../../util/dynamic-table/DynamicTable";

export const SingleRevenueTable = (props: SimpleTableProps<SingleRevenueResponse>) => {
    const {isLoading, data} = props

    return (
        <DynamicTable
            resourceType={"SINGLE_REVENUE"}
            data={data}
        />
    )
}