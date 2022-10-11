import {
    Box,
    Button,
    HStack,
    IconButton,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from "@chakra-ui/react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {useState} from "react";
import {DeleteAlertDialog} from "../util/DeleteAlertDialog";
import {useGlobalContext} from "../../utils/Context";
import {TagRequest, TagResponse} from "../../redux/generated/redux-api";
import {LoadingDataTable} from "../util/LoadingDataTable";

interface Props {
    tags: TagResponse[],
    onAdd: () => void;
    onEdit: (tag: TagResponse) => void,
    onDelete: (tag: TagRequest) => void,
    isLoading?: boolean,
}

export const TagTable = (props: Props) => {
    const {isLoading, tags, onEdit, onDelete: onDeleteFromProps, onAdd} = props

    const {isOpen, onClose, onOpen} = useDisclosure()
    const [deleteValue, setDeleteValue] = useState<TagResponse>()
    const {expenses} = useGlobalContext()

    const onDelete = (tag: TagResponse) => {
        setDeleteValue(tag)
        onOpen()
    }

    const onYes = () => {
        if (deleteValue) onDeleteFromProps(deleteValue)
    }

    return (
        <>
            <TableContainer>
                <Table
                    variant='simple'
                    size={'sm'}
                >
                    <TableCaption>
                        Tags
                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th isNumeric>Actions</Th>
                        </Tr>
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
                                                <Box>
                                                    <IconButton
                                                        aria-label={'edit'}
                                                        icon={<EditIcon/>}
                                                        colorScheme={'teal'}
                                                        mr={2}
                                                        onClick={() => onEdit(tag)}
                                                    />
                                                    <IconButton
                                                        aria-label={'delete'}
                                                        icon={<DeleteIcon/>}
                                                        colorScheme={'red'}
                                                        onClick={() => onDelete(tag)}
                                                        disabled={expenses.findIndex(e => e.tagsIds.includes(tag.id || "")) >= 0}
                                                    />
                                                </Box>
                                            </Td>
                                        </Tr>
                                    )
                                })
                        }
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>Name</Th>
                            <Th isNumeric>Actions</Th>
                        </Tr>
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
            <DeleteAlertDialog
                isOpen={isOpen}
                onClose={onClose}
                onYes={onYes}
                message={`Are you sure to delete ${deleteValue?.name} tag?`}
            />
        </>
    )
}