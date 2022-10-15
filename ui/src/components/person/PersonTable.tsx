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
    useDisclosure, VStack,
} from "@chakra-ui/react";
import {useState} from "react";
import {DeleteAlertDialog} from "../util/DeleteAlertDialog";
import {LoadingDataTable} from "../util/LoadingDataTable";
import {PersonResponse} from "../../redux/generated/redux-api";
import {theme} from "../../theme";
import {ActionButtonsTableCell} from "../util/ActionButtonsTableCell";

interface Props {
    persons: PersonResponse[],
    onAdd: () => void;
    onEdit: (person: PersonResponse) => void,
    onDelete: (person: PersonResponse) => void,
    isLoading?: boolean
}

const TableHeadings = () => (
    <Tr>
        <Th>First name</Th>
        <Th>Last name</Th>
        <Th isNumeric>Actions</Th>
    </Tr>
)

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
            <VStack maxW={"100vw"}>
                <TableContainer minW={["100vw", theme.breakpoints.sm]}>
                    <Table
                        variant='simple'
                        overflowX={"scroll"}
                        maxW={"100vw"}
                        size={'sm'}
                    >
                        <TableCaption>
                            Persons
                        </TableCaption>
                        <Thead>
                            <TableHeadings/>
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
                                                    <ActionButtonsTableCell
                                                        onEdit={() => onEdit(person)}
                                                        onDelete={() => onDelete(person)}
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
                    <Button onClick={onAdd}>Add person</Button>
                </HStack>
            </VStack>
            <DeleteAlertDialog
                isOpen={isOpen}
                onClose={onClose}
                onYes={onYes}
                message={`Are sure to delete ${deleteValue?.firstName} ${deleteValue?.lastName}?`}
            />
        </>
    )
}