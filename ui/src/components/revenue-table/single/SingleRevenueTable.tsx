import {TableCaption, Tbody, Tfoot, Th, Thead, Tr, useBreakpointValue, VStack,} from "@chakra-ui/react";
import {SingleRevenueResponse} from "../../../redux/generated/redux-api";
import {LoadingDataTable} from "../../util/table/LoadingDataTable";
import {SimpleTableProps} from "../../util/table/types";
import {theme} from "../../../theme";
import {SimpleTableContainer} from "../../util/table/SimpleTableContainer";
import {NoDataTable} from "../../util/table/NoDataTable";
import {useMemo} from "react";
import {SingleRevenueMobileTableContent} from "./table/SingleRevenueMobileTableContent";
import {SingleRevenueDesktopTableContent} from "./table/SingleRevenueDesktopTableContent";

const DesktopTableHeadings = () => (
    <Tr>
        <Th>Name</Th>
        <Th isNumeric>Amount</Th>
        <Th>Date</Th>
        <Th>Parent revenue</Th>
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

export const SingleRevenueTable = (props: SimpleTableProps<SingleRevenueResponse>) => {
    const {isLoading, data, onEdit, onDelete} = props

    const isMobile = useBreakpointValue({base: true, md: false}, {fallback: 'md'})

    const TableContent = useMemo(() => isMobile ? SingleRevenueMobileTableContent : SingleRevenueDesktopTableContent, [isMobile])
    const TableHeadings = useMemo(() => isMobile ? MobileTableHeadings : DesktopTableHeadings, [isMobile])

    return (
        <VStack width={["100vw", theme.breakpoints.md]}>
            <SimpleTableContainer>
                <TableCaption>
                    SingleRevenues
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