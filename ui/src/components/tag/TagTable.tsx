import {
    Button,
    HStack,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
    VStack,
} from "@chakra-ui/react";
import {TagResponse} from "../../redux/generated/redux-api";
import {LoadingDataTable} from "../util/table/LoadingDataTable";
import {theme} from "../../theme";
import {ActionButtonsTableCell} from "../util/table/ActionButtonsTableCell";
import {SimpleTableProps} from "../util/table/types";

const TableHeadings = () => (
    <Tr>
        <Th>Name</Th>
        <Th isNumeric>Actions</Th>
    </Tr>
)

export const TagTable = (props: SimpleTableProps<TagResponse>) => {
    const {isLoading, data, onEdit, onDelete, onAdd} = props

    return (
        <VStack maxW={"100vh"}>
            <TableContainer minW={["100vw", theme.breakpoints.sm]}>
                <Table
                    variant='simple'
                    size={'sm'}
                >
                    <TableCaption>
                        Tags
                    </TableCaption>
                    <Thead>
                        <TableHeadings/>
                    </Thead>
                    <Tbody>
                        {
                            isLoading ?
                                <LoadingDataTable size={2}/> :
                                data.map((tag, index) => {
                                    return (
                                        <Tr key={`tag_${index}`}>
                                            <Td>{tag.name}</Td>
                                            <Td isNumeric>
                                                <ActionButtonsTableCell
                                                    onEdit={() => onEdit(tag)}
                                                    onDelete={() => onDelete(tag)}
                                                    name={tag.name || ''}
                                                />
                                            </Td>
                                        </Tr>
                                    )
                                })
                        }
                    </Tbody>
                    <Tfoot>
                        <TableHeadings/>
                    </Tfoot>
                </Table>
            </TableContainer>
            <HStack
                width={"full"}
                flexDirection={"column-reverse"}
                alignItems={"end"}
            >
                <Button onClick={onAdd}>Add tag</Button>
            </HStack>
        </VStack>
    )
}