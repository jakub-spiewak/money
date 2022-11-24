import {Box, Flex, Spacer, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import {
    ALL_POSSIBLE_COLUMNS,
    AnyApiResource,
    AnyResourceResponseKey,
    DynamicTableColumnNames,
    DynamicTableColumnType
} from "../types";
import {ActionButtonsTableCell} from "../../table/ActionButtonsTableCell";
import {useMemo, useState} from "react";
import {ResourceType} from "../../../../redux/slice/types";
import {useAppDispatch} from "../../../../redux/hooks";
import {askForDelete} from "../../../../redux/slice/delete-modal-slice";
import {openModal} from "../../../../redux/slice/modal-slice";
import {mapResponseToRequest} from "../util";
import {DesktopDynamicTableItem} from "./DesktopDynamicTableItem";
import {useDebounce} from "use-debounce";
import {TriangleDownIcon, TriangleUpIcon} from "@chakra-ui/icons";
import {getResourceSortFunction} from "../../../../utils/util";

interface Props {
    resource: AnyApiResource,
    resourceType: ResourceType,
    name?: string,
}

export const DesktopDynamicTable = (props: Props) => {
    const {resource: {data, status: {isFetching}}, resourceType, name} = props
    const [sort, setSort] = useState<{ column: DynamicTableColumnType, order: 'asc' | 'desc' }>()

    const dispatch = useAppDispatch()

    const [showLoadingSpinner] = useDebounce(isFetching, 500)

    const columns: AnyResourceResponseKey[] = useMemo(() => {
        const result: AnyResourceResponseKey[] = []
        ALL_POSSIBLE_COLUMNS.forEach((column) => {
            data.forEach((item) => {
                // @ts-ignore
                if (!result.includes(column) && item[column]) {
                    result.push(column)
                }
            })
        })
        return result
    }, [data])

    const sortedData = useMemo(() => {
        if (!sort) return data
        const sorted = [...data].sort(getResourceSortFunction(sort.column))
        return sort.order === 'asc' ? sorted : sorted.reverse()
    }, [data, sort])

    return (
        <Box
            borderWidth={1}
            borderRadius={16}
        >
            <Flex
                p={4}
                alignItems={"center"}
                borderTopRadius={16}
                backgroundColor={"gray.900"}
            >
                <Text
                    fontSize={"2xl"}
                    fontWeight={"hairline"}
                >
                    {name}
                </Text>
                <Spacer/>
                {showLoadingSpinner && <Spinner/>}
            </Flex>
            <TableContainer>
                <Table>
                    <Thead>
                        <Tr>
                            {columns.map((columnKey) => {
                                const {isNumeric, name} = DynamicTableColumnNames[columnKey]
                                return (
                                    <Th
                                        key={`table_header_${name}`}
                                        isNumeric={isNumeric}
                                    >
                                        <Flex
                                            gap={2}
                                            alignItems={"center"}
                                            _hover={{
                                                cursor: "pointer"
                                            }}
                                            onClick={() => {
                                                if (!sort || sort.column !== columnKey) {
                                                    setSort({column: columnKey, order: "asc"})
                                                    return;
                                                }
                                                if (sort.column === columnKey && sort.order === "asc") {
                                                    setSort({column: columnKey, order: "desc"})
                                                    return;
                                                }
                                                if (sort.column === columnKey && sort.order === "desc") {
                                                    setSort(undefined)
                                                    return;
                                                }
                                            }}
                                        >
                                            {isNumeric && <Spacer/>}
                                            {
                                                sort?.column === columnKey &&
                                                (sort.order === 'asc' ? <TriangleDownIcon/> : <TriangleUpIcon/>)
                                            }
                                            {name}
                                        </Flex>
                                    </Th>
                                )
                            })}
                            <Th isNumeric>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            data.length === 0 &&
                            <Tr>
                                <Td
                                    colSpan={columns.length}
                                    fontSize={"2xl"}
                                    fontWeight={"hairline"}
                                    textAlign={"center"}
                                >
                                    No data
                                </Td>
                            </Tr>
                        }
                        {
                            data.length > 0 &&
                            sortedData.map((item, index) => {
                                const isLast = index === (data.length - 1)
                                return (
                                    <Tr key={`table_row_${item.id}`}>
                                        {
                                            columns.map((columnKey) => {
                                                const {isNumeric} = DynamicTableColumnNames[columnKey]
                                                return (
                                                    <Td
                                                        key={`table_data_${columnKey}`}
                                                        isNumeric={isNumeric}
                                                        borderWidth={isLast ? 0 : undefined}
                                                    >
                                                        <DesktopDynamicTableItem
                                                            tableValue={item}
                                                            tableKey={columnKey}
                                                        />
                                                    </Td>
                                                )
                                            })
                                        }
                                        <Td
                                            isNumeric
                                            borderWidth={isLast ? 0 : undefined}
                                        >
                                            <ActionButtonsTableCell
                                                onEdit={() => {
                                                    dispatch(openModal({
                                                        modal: resourceType,
                                                        value: mapResponseToRequest(resourceType, item),
                                                        id: item.id
                                                    }))
                                                }}
                                                onDelete={() => {
                                                    dispatch(askForDelete({
                                                        type: resourceType,
                                                        name: item.name,
                                                        id: item.id
                                                    }))
                                                }}
                                            />
                                        </Td>
                                    </Tr>
                                )
                            })
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};