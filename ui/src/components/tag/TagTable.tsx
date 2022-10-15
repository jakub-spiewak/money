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
import {TagRequest, TagResponse} from "../../redux/generated/redux-api";
import {LoadingDataTable} from "../util/LoadingDataTable";
import {theme} from "../../theme";
import {ActionButtonsTableCell} from "../util/ActionButtonsTableCell";

interface Props {
    tags: TagResponse[],
    onAdd: () => void;
    onEdit: (tag: TagResponse) => void,
    onDelete: (tag: TagRequest) => void,
    isLoading?: boolean,
}

const TableHeadings = () => (
    <Tr>
        <Th>Name</Th>
        <Th isNumeric>Actions</Th>
    </Tr>
)

export const TagTable = (props: Props) => {
    const {isLoading, tags, onEdit, onDelete, onAdd} = props

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
                                tags.map((tag, index) => {
                                    return (
                                        <Tr key={`tag_${index}`}>
                                            <Td>{tag.name}</Td>
                                            <Td isNumeric>
                                                <ActionButtonsTableCell
                                                    onEdit={() => onEdit(tag)}
                                                    onDelete={() => onDelete(tag)}
                                                    deleteMessage={`Are you sure to delete ${tag?.name} tag?`}
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