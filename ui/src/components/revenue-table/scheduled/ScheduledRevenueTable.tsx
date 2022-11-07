import {TableCaption, Tbody, Tfoot, Th, Thead, Tr, useBreakpointValue, VStack,} from "@chakra-ui/react";
import {ScheduledRevenueResponse} from "../../../redux/generated/redux-api";
import {LoadingDataTable} from "../../util/table/LoadingDataTable";
import {SimpleTableProps} from "../../util/table/types";
import {theme} from "../../../theme";
import {SimpleTableContainer} from "../../util/table/SimpleTableContainer";
import {NoDataTable} from "../../util/table/NoDataTable";
import {useMemo} from "react";
import {ScheduledRevenueMobileTableContent} from "./table/ScheduledRevenueMobileTableContent";
import {ScheduledRevenueDesktopTableContent} from "./table/ScheduledRevenueDesktopTableContent";

const DesktopTableHeadings = () => (
    <Tr>
        <Th>Name</Th>
        <Th isNumeric>Amount</Th>
        <Th>Date</Th>
        <Th isNumeric>Actions</Th>
    </Tr>
)

const MobileTableHeadings = () => (
    <Tr>
        <Th>Name</Th>
        <Th isNumeric>Amount</Th>
        <Th isNumeric>Actions</Th>
    </Tr>
)

export const ScheduledRevenueTable = (props: SimpleTableProps<ScheduledRevenueResponse>) => {
    const {isLoading, data, onEdit, onDelete} = props

    const isMobile = useBreakpointValue({base: true, md: false}, {fallback: 'md'})

    const TableContent = useMemo(() => isMobile ? ScheduledRevenueMobileTableContent : ScheduledRevenueDesktopTableContent, [isMobile])
    const TableHeadings = useMemo(() => isMobile ? MobileTableHeadings : DesktopTableHeadings, [isMobile])

    return (
        <VStack width={["100vw", theme.breakpoints.md]}>
            <SimpleTableContainer>
                <TableCaption>
                    ScheduledRevenues
                </TableCaption>
                <Thead>
                    <TableHeadings/>
                </Thead>
                <Tbody>
                    {
                        isLoading ?
                            <LoadingDataTable size={5}/> :
                            data.length === 0 ?
                                <NoDataTable size={5}/> :
                                <TableContent
                                    data={data}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                    }
                </Tbody>
                <Tfoot>
                    <TableHeadings/>
                </Tfoot>
            </SimpleTableContainer>
        </VStack>
    )
}