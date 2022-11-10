import {DynamicTable} from "../../util/dynamic-table/DynamicTable";
import {useReadScheduledExpenseQuery} from "../../../redux/generated/redux-api";
import {useAppSelector} from "../../../redux/hooks";
import {mapResourceFromHook} from "../../util/dynamic-table/util";

export const ScheduledExpenseTable = () => {

    const currentDate = useAppSelector(state => state.currentDate.value)
    const resource = useReadScheduledExpenseQuery({month: currentDate})

    return (
        <DynamicTable
            resource={mapResourceFromHook(resource)}
            resourceType={"SCHEDULED_EXPENSE"}
            name={"Scheduled expense"}
        />
    )
}