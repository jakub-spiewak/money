import {Button, HStack, TableCaption, Tbody, Td, Text, Tfoot, Th, Thead, Tr, VStack} from "@chakra-ui/react";
import {TagResponse, useDeleteTagMutation} from "../../redux/generated/redux-api";
import {LoadingDataTable} from "../util/table/LoadingDataTable";
import {theme} from "../../theme";
import {ActionButtonsTableCell} from "../util/table/ActionButtonsTableCell";
import {SimpleTableProps} from "../util/table/types";
import {SimpleTableContainer} from "../util/table/SimpleTableContainer";
import {NoDataTable} from "../util/table/NoDataTable";
import {useAppDispatch} from "../../redux/hooks";
import {openModal} from "../../redux/slice/modal-slice";

const TableHeadings = () => (
    <Tr>
        <Th>Name</Th>
        <Th isNumeric>Actions</Th>
    </Tr>
)

export const TagTable = (props: SimpleTableProps<TagResponse>) => {
    const {isLoading, data} = props

    const dispatch = useAppDispatch()
    const [deleteTag] = useDeleteTagMutation()

    return (
        <VStack width={["100vw", theme.breakpoints.sm]}>
            <SimpleTableContainer>
                <TableCaption>
                    Tags <Text fontWeight={"hairline"}>(will be moved to settings...)</Text>
                </TableCaption>
                <Thead>
                    <TableHeadings/>
                </Thead>
                <Tbody>
                    {
                        isLoading ?
                            <LoadingDataTable size={2}/> :
                            data.length === 0 ?
                                <NoDataTable size={2}/> :
                                data.map((tag, index) => {
                                    return (
                                        <Tr key={`tag_${index}`}>
                                            <Td>{tag.name}</Td>
                                            <Td isNumeric>
                                                <ActionButtonsTableCell
                                                    onEdit={() => dispatch(openModal({
                                                        modal: "TAG",
                                                        value: tag,
                                                        id: tag.id
                                                    }))}
                                                    onDelete={() => deleteTag({id: tag.id})}
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
                <Button
                    onClick={() => dispatch(openModal({
                        modal: "TAG",
                        value: {name: ""},
                    }))}
                >
                    Add tag
                </Button>
            </HStack>
        </VStack>
    )
}