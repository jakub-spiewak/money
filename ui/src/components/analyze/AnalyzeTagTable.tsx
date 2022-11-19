import {Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr} from "@chakra-ui/react";
import {AnalyzeTagTableExpensesCell} from "./AnalyzeTagTableExpensesCell";
import {TagSummary} from "../../redux/generated/redux-api";

interface Props {
    tags: TagSummary[]
}

export const AnalyzeTagTable = (props: Props) => {
    const {tags} = props

    return (
        <TableContainer
            pt={8}
            maxW={"100vw"}
            flex={2}
            overflow={"auto"}
        >
            <Table variant={'simple'}>
                <TableCaption>Summary</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Info</Th>
                        <Th>Name</Th>
                        <Th isNumeric>Amount</Th>
                        <Th isNumeric>% of expenses</Th>
                        <Th isNumeric>% of revenues</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        tags.map((tag, index) => {
                            const {name, amount, expensesFactor, revenuesFactor} = tag

                            return (
                                <Tr
                                    key={`analyze_tag_${index}`}
                                    _hover={{background: "blue.300"}}
                                >
                                    <Td><AnalyzeTagTableExpensesCell tag={tag}/></Td>
                                    <Td>{name}</Td>
                                    <Td isNumeric>{amount?.toFixed(2)}</Td>
                                    <Td isNumeric>{`${expensesFactor.toFixed(2)}%`}</Td>
                                    <Td isNumeric>{`${revenuesFactor.toFixed(2)}%`}</Td>
                                </Tr>
                            )
                        })
                    }
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th>Info</Th>
                        <Th>Name</Th>
                        <Th isNumeric>Amount</Th>
                        <Th isNumeric>% of expenses</Th>
                        <Th isNumeric>% of revenues</Th>
                    </Tr>
                </Tfoot>
            </Table>
        </TableContainer>
    )
}