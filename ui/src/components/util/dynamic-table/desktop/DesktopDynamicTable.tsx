import {Box, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import {ALL_POSSIBLE_COLUMNS, AnyApiResource, AnyResourceResponseKey, DynamicTableColumnNames} from "../types";
import {ActionButtonsTableCell} from "../../table/ActionButtonsTableCell";
import {useMemo} from "react";
import {ResourceType} from "../../../../redux/slice/types";
import {useAppDispatch} from "../../../../redux/hooks";
import {askForDelete} from "../../../../redux/slice/delete-modal-slice";
import {theme} from "../../../../theme";
import {openModal} from "../../../../redux/slice/modal-slice";
import {mapResponseToRequest} from "../util";
import {DesktopDynamicTableItem} from "./DesktopDynamicTableItem";

interface Props {
    resource: AnyApiResource,
    resourceType: ResourceType,
    name?: string,
}

export const DesktopDynamicTable = (props: Props) => {
    const {resource: {data}, resourceType, name} = props

    const dispatch = useAppDispatch()

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


    return (
        <Box
            borderWidth={1}
            borderRadius={16}
            mx={4}
        >
            <Box
                p={4}
                borderTopRadius={16}
                backgroundColor={"gray.900"}
                display={name ? "block" : "none"}
            >
                <Text
                    fontSize={"2xl"}
                    fontWeight={"hairline"}
                >
                    {name}
                </Text>
            </Box>
            <TableContainer width={["100vw", null, null, theme.breakpoints.lg]}>
                <Table>
                    <Thead>
                        <Tr>
                            {columns.map((columnKey) => {
                                const {isNumeric, name} = DynamicTableColumnNames[columnKey]
                                return (
                                    <Th
                                        key={`table_header_${name}`}
                                        isNumeric={isNumeric}
                                    >{name}</Th>
                                )
                            })}
                            <Th isNumeric>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            data.map((item) => {
                                return (
                                    <Tr key={`table_row_${item.id}`}>
                                        {
                                            columns.map((columnKey) => {
                                                const {isNumeric} = DynamicTableColumnNames[columnKey]
                                                return (
                                                    <Td
                                                        key={`table_data_${columnKey}`}
                                                        isNumeric={isNumeric}
                                                    >
                                                        <DesktopDynamicTableItem
                                                            tableValue={item}
                                                            tableKey={columnKey}
                                                        />
                                                    </Td>
                                                )
                                            })
                                        }
                                        <Td isNumeric>
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