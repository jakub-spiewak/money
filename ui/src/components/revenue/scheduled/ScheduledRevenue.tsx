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

interface Props {
    modal: FormModalStateType<ScheduledRevenueRequest>
}

export const ScheduledRevenue = (props: Props) => {

    const {modal} = props

    const {data, isLoading, isFetching} = useReadScheduledRevenueQuery()
    const [saveScheduledRevenue] = useCreateScheduledRevenueMutation()
    const [updateScheduledRevenue] = useUpdateScheduledRevenueMutation()
    const [deleteScheduledRevenue] = useDeleteScheduledRevenueMutation()

    const onEdit = (revenue: ScheduledRevenueResponse) => {
        revenue.id && modal.open({
            id: revenue.id,
            request: {
                name: revenue.name,
                amount: revenue.amount,
                person: revenue.person?.id
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