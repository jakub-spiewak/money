import {
    Th,
    Tr,
    Table,
    TableCaption,
    TableContainer,
    Thead,
    Tbody,
    Td,
    Tfoot,
    Box,
    IconButton, HStack, useDisclosure, Button,
} from "@chakra-ui/react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {useState} from "react";
import {DeleteAlertDialog} from "../util/DeleteAlertDialog";
import {TagType} from "../../utils/CommonTypes";
import {useGlobalContext} from "../../utils/Context";

interface TagTableProps {
    tags: TagType[],
    onAdd: () => void;
    onEdit: (tag: TagType) => void,
    onDelete: (tag: TagType) => void,
}

export const TagTable = (props: TagTableProps) => {
    const {tags, onEdit, onDelete: onDeleteFromProps, onAdd} = props

    const {isOpen, onClose, onOpen} = useDisclosure()
    const [deleteValue, setDeleteValue] = useState<TagType>()
    const {expenses} = useGlobalContext()

    const onDelete = (tag: TagType) => {
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
                                                    disabled={expenses.findIndex(e => e.tagsIds.includes(tag.id)) >= 0}
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