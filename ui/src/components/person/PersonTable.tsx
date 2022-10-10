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
import {LoadingDataTable} from "../util/LoadingDataTable";
import {PersonResponse} from "../../redux/generated/redux-api";

interface Props {
    persons: PersonResponse[],
    onAdd: () => void;
    onEdit: (person: PersonResponse) => void,
    onDelete: (person: PersonResponse) => void,
    isLoading?: boolean
}

export const PersonTable = (props: Props) => {
    const {persons, onEdit, onDelete: onDeleteFromProps, onAdd, isLoading} = props

    const {isOpen, onClose, onOpen} = useDisclosure()
    const [deleteValue, setDeleteValue] = useState<PersonResponse>()

    const onDelete = (person: PersonResponse) => {
        setDeleteValue(person)
        onOpen()
    }

    const onYes = () => {
        if (deleteValue) onDeleteFromProps(deleteValue)
    }

    return (
        <>
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>
                        Persons
                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th>First name</Th>
                            <Th>Last name</Th>
                            <Th isNumeric>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            isLoading ?
                                <LoadingDataTable size={3}/> :
                                persons.map((person, index) => {
                                    return (
                                        <Tr key={`person_${index}`}>
                                            <Td>{person.firstName}</Td>
                                            <Td>{person.lastName}</Td>
                                            <Td isNumeric>
                                                <Box>
                                                    <IconButton
                                                        aria-label={'edit'}
                                                        icon={<EditIcon/>}
                                                        colorScheme={'teal'}
                                                        mr={2}
                                                        onClick={() => onEdit(person)}
                                                    />
                                                    <IconButton
                                                        aria-label={'delete'}
                                                        icon={<DeleteIcon/>}
                                                        colorScheme={'red'}
                                                        onClick={() => onDelete(person)}
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
                            <Th>First name</Th>
                            <Th>Last name</Th>
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
                <Button onClick={onAdd}>Add person</Button>
            </HStack>
            <DeleteAlertDialog
                isOpen={isOpen}
                onClose={onClose}
                onYes={onYes}
                message={`Are sure to delete ${deleteValue?.firstName} ${deleteValue?.lastName}?`}
            />
        </>
    )
}