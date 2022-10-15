import {RevenueForm} from "./RevenueForm";
import {RevenueTable} from "./RevenueTable";
import {Center} from "@chakra-ui/react";
import {useFormModalStateType} from "../../utils/Hooks";
import {
    RevenueRequest,
    RevenueResponse,
    useCreateRevenueMutation,
    useDeleteRevenueMutation,
    useReadRevenueQuery,
    useUpdateRevenueMutation
} from "../../redux/generated/redux-api";

export const RevenueScreen = () => {

    const modal = useFormModalStateType<RevenueRequest>()

    const {data, isLoading, isFetching} = useReadRevenueQuery()
    const [saveRevenue] = useCreateRevenueMutation()
    const [updateRevenue] = useUpdateRevenueMutation()
    const [deleteRevenue] = useDeleteRevenueMutation()

    const onEdit = (revenue: RevenueResponse) => {
        revenue.id && modal.open({
            id: revenue.id,
            request: {
                name: revenue.name,
                amount: revenue.amount,
                person: revenue.person?.id
            }
        })
    }

    const onDelete = async (revenue: RevenueResponse) => {
        revenue.id && await deleteRevenue({id: revenue.id})
    }

    const onSubmit = async (revenue: RevenueRequest) => {
        // alert(JSON.stringify(revenue, null, 2))
        if (modal.value?.id) await updateRevenue({id: modal.value.id, revenueRequest: revenue})
        else await saveRevenue({revenueRequest: revenue})
    }

    return (
        <>
            <Center>
                <RevenueTable
                    data={data || []}
                    onAdd={modal.open}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isLoading={isLoading || isFetching}
                />
            </Center>
            <RevenueForm
                state={modal}
                onSubmit={onSubmit}
            />
        </>
    )
}