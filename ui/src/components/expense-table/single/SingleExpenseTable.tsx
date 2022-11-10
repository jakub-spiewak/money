import {useReadSingleExpenseQuery} from "../../../redux/generated/redux-api";
import {DynamicTable} from "../../util/dynamic-table/DynamicTable";
import {useAppSelector} from "../../../redux/hooks";
import {mapResourceFromHook} from "../../util/dynamic-table/util";

export const SingleExpenseTable = () => {

    const currentDate = useAppSelector(state => state.currentDate.value)
    const resource = useReadSingleExpenseQuery({month: currentDate})

    return (
        <DynamicTable
            resource={mapResourceFromHook(resource)}
            resourceType={"SINGLE_EXPENSE"}
            name={"Single expenses"}
        />
    )
}