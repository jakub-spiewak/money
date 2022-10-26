import {SingleRevenueForm} from "./SingleRevenueForm";
import {SingleRevenueTable} from "./SingleRevenueTable";
import {Center} from "@chakra-ui/react";
import {FormModalStateType} from "../../../utils/Hooks";
import {
    SingleRevenueRequest,
    SingleRevenueResponse,
    useCreateSingleRevenueMutation,
    useDeleteSingleRevenueMutation,
    useReadSingleRevenueQuery,
    useUpdateSingleRevenueMutation
} from "../../../redux/generated/redux-api";
import {useAppSelector} from "../../../redux/hooks";

interface Props {
    modal: FormModalStateType<SingleRevenueRequest>
}

export const SingleRevenue = (props: Props) => {

    const {modal} = props

    const {year, month} = useAppSelector(state => state.currentDate)

    const {
        data,
        isLoading,
        isFetching
    } = useReadSingleRevenueQuery({month: `${year}-${month <= 9 ? `0${month}` : month}`})
    const [saveSingleRevenue] = useCreateSingleRevenueMutation()
    const [updateSingleRevenue] = useUpdateSingleRevenueMutation()
    const [deleteSingleRevenue] = useDeleteSingleRevenueMutation()

    const onEdit = (revenue: SingleRevenueResponse) => {
        revenue.id && modal.open({
            id: revenue.id,
            request: {
                name: revenue.name,
                amount: revenue.amount,
                date: revenue.date,
                parentRevenue: revenue.parentRevenue?.id
            }
        })
    }

    const onDelete = async (revenue: SingleRevenueResponse) => {
        revenue.id && await deleteSingleRevenue({id: revenue.id})
    }

    const onSubmit = async (revenue: SingleRevenueRequest) => {
        if (modal.value?.id) await updateSingleRevenue({id: modal.value.id, singleRevenueRequest: revenue})
        else await saveSingleRevenue({singleRevenueRequest: revenue})
    }

    return (
        <>
            <Center>
                <SingleRevenueTable
                    data={data || []}
                    onAdd={modal.open}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isLoading={isLoading || isFetching}
                />
            </Center>
            <SingleRevenueForm
                state={modal}
                onSubmit={onSubmit}
            />
        </>
    )
}