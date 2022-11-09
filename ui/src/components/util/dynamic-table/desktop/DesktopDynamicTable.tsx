import {Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {ALL_POSSIBLE_COLUMNS, AnyResourceResponseKey, DynamicTableColumnNames} from "../types";
import {ActionButtonsTableCell} from "../../table/ActionButtonsTableCell";
import {useMemo} from "react";
import {AnyResourceResponse, ResourceType} from "../../../../redux/slice/types";
import {useAppDispatch} from "../../../../redux/hooks";
import {askForDelete} from "../../../../redux/slice/delete-modal-slice";
import {theme} from "../../../../theme";
import {openModal} from "../../../../redux/slice/modal-slice";
import {mapResponseToRequest} from "../util";
import {DesktopDynamicTableItem} from "./DesktopDynamicTableItem";

interface Props {
    data: AnyResourceResponse[],
    resourceType: ResourceType,
}

export const DesktopDynamicTable = (props: Props) => {
    const {data, resourceType} = props

    const dispatch = useAppDispatch()

    const columns: AnyResourceResponseKey[] = useMemo(() => {
        const result: AnyResourceResponseKey[] = []
        ALL_POSSIBLE_COLUMNS.forEach((column) => {
            data.forEach((dataValue) => {
                // @ts-ignore
                if (!result.includes(column) && dataValue[column]) {
                    result.push(column)
                }
            })
        })
        return result
    }, [data])


    return (
        <TableContainer width={["100vw", null, null, theme.breakpoints.lg]}>
            <Table>
                <Thead>
                    <Tr>
                        {columns.map((columnKey) => {
                            const {isNumeric, name} = DynamicTableColumnNames[columnKey]
                            return (
                                <Th isNumeric={isNumeric}>{name}</Th>
                            )
                        })}
                        <Th isNumeric>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        data.map((value) => {
                            return (
                                <Tr>
                                    {
                                        columns.map((columnKey) => {
                                            const {isNumeric} = DynamicTableColumnNames[columnKey]
                                            return (
                                                <Td isNumeric={isNumeric}>
                                                    <DesktopDynamicTableItem
                                                        tableValue={value}
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
                                                    value: mapResponseToRequest(resourceType, value),
                                                    id: value.id
                                                }))
                                            }}
                                            onDelete={() => {
                                                dispatch(askForDelete({
                                                    type: resourceType,
                                                    name: value.name,
                                                    id: value.id
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
    );
};