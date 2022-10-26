import {ScheduledRevenueForm} from "./ScheduledRevenueForm";
import {ScheduledRevenueTable} from "./ScheduledRevenueTable";
import {Center} from "@chakra-ui/react";
import {FormModalStateType} from "../../../utils/Hooks";
import {
    ScheduledRevenueRequest,
    ScheduledRevenueResponse,
    useCreateScheduledRevenueMutation,
    useDeleteScheduledRevenueMutation,
    useReadScheduledRevenueQuery,
    useUpdateScheduledRevenueMutation
} from "../../../redux/generated/redux-api";
import {useAppSelector} from "../../../redux/hooks";

interface Props {
    modal: FormModalStateType<ScheduledRevenueRequest>
}

export const ScheduledRevenue = (props: Props) => {

    const {modal} = props

    const {year, month} = useAppSelector(state => state.currentDate)

    const {
        data,
        isLoading,
        isFetching
    } = useReadScheduledRevenueQuery({month: `${year}-${month <= 9 ? `0${month}` : month}`})

    const [saveScheduledRevenue] = useCreateScheduledRevenueMutation()
    const [updateScheduledRevenue] = useUpdateScheduledRevenueMutation()
    const [deleteScheduledRevenue] = useDeleteScheduledRevenueMutation()

    const onEdit = (revenue: ScheduledRevenueResponse) => {
        revenue.id && modal.open({
            id: revenue.id,
            request: {
                name: revenue.name,
                amount: revenue.amount,
            }
        })
    }

    const onDelete = async (revenue: ScheduledRevenueResponse) => {
        revenue.id && await deleteScheduledRevenue({id: revenue.id})
    }

    const onSubmit = async (revenue: ScheduledRevenueRequest) => {
        if (modal.value?.id) await updateScheduledRevenue({id: modal.value.id, scheduledRevenueRequest: revenue})
        else await saveScheduledRevenue({scheduledRevenueRequest: revenue})
    }

    return (
        <>
            <Center>
                <ScheduledRevenueTable
                    data={data || []}
                    onAdd={modal.open}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isLoading={isLoading || isFetching}
                />
            </Center>
            <ScheduledRevenueForm
                state={modal}
                onSubmit={onSubmit}
            />
        </>
    )
}