import {ScheduledRevenueForm} from "./ScheduledRevenueForm";
import {ScheduledRevenueTable} from "./ScheduledRevenueTable";
import {Center} from "@chakra-ui/react";
import {useReadScheduledRevenueQuery,} from "../../../redux/generated/redux-api";
import {useAppSelector} from "../../../redux/hooks";

export const ScheduledRevenue = () => {

    const {year, month} = useAppSelector(state => state.currentDate)

    const {
        data,
        isLoading,
        isFetching
    } = useReadScheduledRevenueQuery({month: `${year}-${month <= 9 ? `0${month}` : month}`})

    return (
        <>
            <Center>
                <ScheduledRevenueTable
                    data={data || []}
                    isLoading={isLoading || isFetching}
                />
            </Center>
            <ScheduledRevenueForm/>
        </>
    )
}