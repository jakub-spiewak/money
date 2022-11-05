import {SingleRevenueForm} from "./SingleRevenueForm";
import {SingleRevenueTable} from "./SingleRevenueTable";
import {Center} from "@chakra-ui/react";
import {
    SingleRevenueResponse,
    useDeleteSingleRevenueMutation,
    useReadSingleRevenueQuery
} from "../../../redux/generated/redux-api";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {openModal} from "../../../redux/slice/modal-slice";

export const SingleRevenue = () => {

    const {year, month} = useAppSelector(state => state.currentDate)
    const dispatch = useAppDispatch()

    const {
        data,
        isLoading,
        isFetching
    } = useReadSingleRevenueQuery({month: `${year}-${month <= 9 ? `0${month}` : month}`})
    const [deleteSingleRevenue] = useDeleteSingleRevenueMutation()

    const onEdit = (revenue: SingleRevenueResponse) => {
        dispatch(openModal({
                modal: "SINGLE_REVENUE",
                id: revenue.id,
                value: {
                    name: revenue.name,
                    amount: revenue.amount,
                    date: revenue.date,
                    parentRevenue: revenue.parentRevenue?.id
                }
            })
        )
    }

    const onDelete = async (revenue: SingleRevenueResponse) => {
        revenue.id && await deleteSingleRevenue({id: revenue.id})
    }

    return (
        <>
            <Center>
                <SingleRevenueTable
                    data={data || []}
                    onAdd={() => dispatch(openModal({modal: "SINGLE_REVENUE"}))}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isLoading={isLoading || isFetching}
                />
            </Center>
            <SingleRevenueForm/>
        </>
    )
}