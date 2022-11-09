import {useReadSingleRevenueQuery} from "../../../redux/generated/redux-api";
import {DynamicTable} from "../../util/dynamic-table/DynamicTable";
import {useAppSelector} from "../../../redux/hooks";
import {mapResourceFromHook} from "../../util/dynamic-table/util";

export const SingleRevenueTable = () => {

    const currentDate = useAppSelector(state => state.currentDate.value)
    const resource = useReadSingleRevenueQuery({month: currentDate})

    return (
        <DynamicTable
            resourceType={"SINGLE_REVENUE"}
            resource={mapResourceFromHook(resource)}
        />
    )
}