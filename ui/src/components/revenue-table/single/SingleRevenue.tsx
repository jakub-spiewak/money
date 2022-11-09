import {SingleRevenueTable} from "./SingleRevenueTable";
import {Center} from "@chakra-ui/react";
import {useReadSingleRevenueQuery} from "../../../redux/generated/redux-api";
import {useAppSelector} from "../../../redux/hooks";

export const SingleRevenue = () => {

    const {year, month} = useAppSelector(state => state.currentDate)

    const {
        data,
        isLoading,
        isFetching
    } = useReadSingleRevenueQuery({month: `${year}-${month <= 9 ? `0${month}` : month}`})

    return (
        <>
            <Center>
                <SingleRevenueTable
                    data={data || []}
                    isLoading={isLoading || isFetching}
                />
            </Center>
        </>
    )
}