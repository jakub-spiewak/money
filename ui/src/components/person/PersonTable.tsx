import {
    Button,
    HStack,
    TableCaption,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
    VStack,
} from "@chakra-ui/react";
import {LoadingDataTable} from "../util/table/LoadingDataTable";
import {PersonResponse} from "../../redux/generated/redux-api";
import {theme} from "../../theme";
import {ActionButtonsTableCell} from "../util/table/ActionButtonsTableCell";
import {SimpleTableProps} from "../util/table/types";
import {SimpleTableContainer} from "../util/table/SimpleTableContainer";
import {NoDataTable} from "../util/table/NoDataTable";

const TableHeadings = () => (
    <Tr>
        <Th>First name</Th>
        <Th>Last name</Th>
        <Th isNumeric>Actions</Th>
    </Tr>
)

export const PersonTable = (props: SimpleTableProps<PersonResponse>) => {
    const {data, onEdit, onDelete, onAdd, isLoading} = props

    return (
        <VStack width={["100vw", theme.breakpoints.sm]}>
            <SimpleTableContainer>
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
                            data.length === 0 ?
                                <NoDataTable size={3}/> :
                                data.map((person, index) => {
                                    return (
                                        <Tr key={`person_${index}`}>
                                            <Td>{person.firstName}</Td>
                                            <Td>{person.lastName}</Td>
                                            <Td isNumeric>
                                                <ActionButtonsTableCell
                                                    onEdit={() => onEdit(person)}
                                                    onDelete={() => onDelete(person)}
                                                    name={person?.firstName || ''}
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
            </SimpleTableContainer>
            <HStack
                width={"full"}
                flexDirection={"column-reverse"}
                alignItems={"end"}
            >
                <Button onClick={onAdd}>Add person</Button>
            </HStack>
        </VStack>
    )
}