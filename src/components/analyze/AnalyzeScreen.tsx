import 'chart.js/auto';
import {
    Button, Center,
    Container, Heading,
    HStack,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td, Text,
    Tfoot,
    Th,
    Thead,
    Tr, VStack
} from "@chakra-ui/react";
import {Doughnut} from "react-chartjs-2"
import {useGlobalContext} from "../../utils/Context";
import {InfoIcon} from "@chakra-ui/icons";

export const AnalyzeScreen = () => {
    const {expenses, revenues, tags} = useGlobalContext()

    const revenue = revenues.map((r) => r.amount).reduce((p, c) => p + c, 0)
    const expense = expenses.map((r) => r.amount).reduce((p, c) => p + c, 0)

    return (
        // <Container maxW={'xl'}>
        <>
            <Center>
                <VStack>
                    <Text fontSize={'4xl'}>Revenues: <b>{revenue.toLocaleString()}</b></Text>
                    <Text fontSize={'xl'}>Expenses: <b>{expense.toLocaleString()}</b> ({(100 * expense / revenue).toFixed(2)}%)</Text>
                </VStack>
            </Center>
            <HStack>
                <Container maxW={'sm'}>
                    <Doughnut
                        id={"chart"}
                        data={{
                            labels: ["Expense", "Revenue"],
                            datasets: [{
                                data: [expense, revenue - expense],
                                backgroundColor: ["red", "green"]
                            }],
                        }}
                    />
                </Container>
                <Container>
                    <TableContainer pt={8}>
                        <Table variant={'simple'}>
                            <TableCaption>Summary</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Info</Th>
                                    <Th>Name</Th>
                                    <Th isNumeric>Amount</Th>
                                    <Th isNumeric>%</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    tags
                                        .sort((a, b) => {
                                            const amountA = expenses
                                                .filter((e) => e.tagsIds.includes(a.id))
                                                .map(e => e.amount)
                                                .reduce((p, c) => p + c, 0)

                                            const amountB = expenses
                                                .filter((e) => e.tagsIds.includes(b.id))
                                                .map(e => e.amount)
                                                .reduce((p, c) => p + c, 0)

                                            return amountB - amountA
                                        })
                                        .map((tag, index) => {
                                            const amount = expenses
                                                .filter((e) => e.tagsIds.includes(tag.id))
                                                .map(e => e.amount)
                                                .reduce((p, c) => p + c, 0)
                                            const partOfWhole = (amount / revenue) * 100
                                            return (
                                                <Tr>
                                                    <Td>
                                                        <Popover>
                                                            <PopoverTrigger>
                                                                <IconButton
                                                                    icon={<InfoIcon/>}
                                                                    aria-label={'icon'}
                                                                />
                                                            </PopoverTrigger>
                                                            <PopoverContent>
                                                                <PopoverArrow/>
                                                                <PopoverCloseButton/>
                                                                <PopoverHeader>Info
                                                                    about: <b>{tag.name}</b></PopoverHeader>
                                                                <PopoverBody>
                                                                    <Table>
                                                                        {
                                                                            expenses
                                                                                .filter((e) => e.tagsIds.includes(tag.id))
                                                                                .sort((a, b) => b.amount - a.amount)
                                                                                .map((e, index) => (
                                                                                    <Tr key={`summary_expense_row_${index}`}>
                                                                                        <Td>{e.name}</Td>
                                                                                        <Td>{e.amount.toFixed(2)}</Td>
                                                                                    </Tr>
                                                                                ))
                                                                        }
                                                                    </Table>
                                                                </PopoverBody>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </Td>
                                                    <Td>{tag.name}</Td>
                                                    <Td isNumeric>{amount.toFixed(2)}</Td>
                                                    <Td isNumeric>{`${partOfWhole.toFixed(2)}%`}</Td>
                                                </Tr>
                                            )
                                        })
                                }
                            </Tbody>
                            <Tfoot></Tfoot>
                        </Table>
                    </TableContainer>
                </Container>
            </HStack>
        </>
        // </Container>
    )
}