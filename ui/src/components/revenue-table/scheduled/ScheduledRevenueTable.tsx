import {ScheduledRevenueResponse} from "../../../redux/generated/redux-api";
import {SimpleTableProps} from "../../util/table/types";
import {DynamicTable} from "../../util/dynamic-table/DynamicTable";

export const ScheduledRevenueTable = (props: SimpleTableProps<ScheduledRevenueResponse>) => {
    const {isLoading, data} = props

    return (
        <DynamicTable
            data={data}
            resourceType={"SCHEDULED_REVENUE"}
        />
    )
}