import {DynamicTable} from "../../util/dynamic-table/DynamicTable";
import {useAppSelector} from "../../../redux/hooks";
import {useReadScheduledRevenueQuery} from "../../../redux/generated/redux-api";
import {mapResourceFromHook} from "../../util/dynamic-table/util";

export const ScheduledRevenueTable = () => {

    const currentDate = useAppSelector(state => state.currentDate.value)
    const resource = useReadScheduledRevenueQuery({month: currentDate})

    return (
        <DynamicTable
            resourceType={"SCHEDULED_REVENUE"}
            resource={mapResourceFromHook(resource)}
            name={"Scheduled revenue"}
        />
    )
}