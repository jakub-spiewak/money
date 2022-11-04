import {ScheduledRevenueForm} from "./ScheduledRevenueForm";
import {ScheduledRevenueTable} from "./ScheduledRevenueTable";
import {Center} from "@chakra-ui/react";
import {
    ScheduledRevenueResponse,
    useDeleteScheduledRevenueMutation,
    useReadScheduledRevenueQuery,
} from "../../../redux/generated/redux-api";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {openModal} from "../../../redux/slice/modal-slice";

export const ScheduledRevenue = () => {

    const dispatch = useAppDispatch()
    const {year, month} = useAppSelector(state => state.currentDate)

    const {
        data,
        isLoading,
        isFetching
    } = useReadScheduledRevenueQuery({month: `${year}-${month <= 9 ? `0${month}` : month}`})

    const [deleteScheduledRevenue] = useDeleteScheduledRevenueMutation()

    const onEdit = (revenue: ScheduledRevenueResponse) => {
        revenue.id && dispatch(openModal({
                modal: "SCHEDULED_REVENUE",
                id: revenue.id,
                value: {
                    name: revenue.name,
                    amount: revenue.amount,
                    date: revenue.date
                }
            })
        )
    }

    const onDelete = async (revenue: ScheduledRevenueResponse) => {
        revenue.id && await deleteScheduledRevenue({id: revenue.id})
    }

    return (
        <>
            <Center>
                <ScheduledRevenueTable
                    data={data || []}
                    onAdd={() => dispatch(openModal({modal: "SCHEDULED_REVENUE"}))}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isLoading={isLoading || isFetching}
                />
            </Center>
            <ScheduledRevenueForm/>
        </>
    )
}