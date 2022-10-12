import 'chart.js/auto';
import {
    Box,
    Center,
    Container, Flex,
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
    Tr,
} from "@chakra-ui/react";
import {Doughnut} from "react-chartjs-2"
import {InfoIcon} from "@chakra-ui/icons";
import {useAnalyzeQuery} from "../../redux/generated/redux-api";
import {theme} from "../../theme";

export const AnalyzeScreen = () => {

    const {data} = useAnalyzeQuery()

    if (!data) return null

    const {tags, expensesAmountSum, revenueAmountSum, savingAmountSum, expensesPart, savingPart} = data

    return (
        // <Container maxW={'xl'}>
        <>
            <Center>
                <Container
                    pb={8}
                    maxW={"6xl"}
                >
                    <Center flexDirection={"column"}>
                        <Text fontSize={'4xl'}>Revenues: <b>{revenueAmountSum?.toLocaleString()}</b></Text>
                        <Text fontSize={'xl'}>Expenses: <b>{expensesAmountSum?.toLocaleString()}</b> ({expensesPart}%)</Text>
                        <Text fontSize={'xl'}>Savings: <b>{savingAmountSum?.toLocaleString()}</b> ({savingPart}%)</Text>
                    </Center>
                </Container>
            </Center>
            <Flex
                gap={8}
                flexDirection={["column", null, null, null, "row"]}
                alignItems={'center'}
            >
                <Box
                    width={'100%'}
                    maxW={theme.breakpoints.sm}
                    flex={1}
                >
                    <Doughnut
                        data={{
                            labels: ["Expense", "Savings"],
                            datasets: [{
                                data: [expensesAmountSum || 0, savingAmountSum || 0],
                                backgroundColor: ["red", "green"]
                            }]
                        }}
                    />
                </Box>
                <TableContainer
                    pt={8}
                    maxW={"100vw"}
                    flex={2}
                    overflow={"scroll"}
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
                                tags?.map((tag, index) => {
                                    const {expenses, name, amount, partOfExpenses, partOfRevenues} = tag

                                    return (
                                        <Tr
                                            key={`analyze_tag_${index}`}
                                            _hover={{background: "blue.300"}}
                                        >
                                            <Td>
                                                <Popover isLazy>
                                                    <PopoverTrigger>
                                                        <IconButton
                                                            icon={<InfoIcon/>}
                                                            aria-label={'icon'}
                                                        />
                                                    </PopoverTrigger>
                                                    <PopoverContent width={"unset"}>
                                                        <PopoverArrow/>
                                                        <PopoverCloseButton/>
                                                        <PopoverHeader>Info
                                                            about: <b>{name}</b></PopoverHeader>
                                                        <PopoverBody>
                                                            <Table
                                                                variant={'simple'}
                                                                size={'sm'}
                                                            >
                                                                <Tbody>
                                                                    {
                                                                        expenses?.map((e, index) => (
                                                                            <Tr key={`summary_expense_row_${index}`}>
                                                                                <Td>{e.name}</Td>
                                                                                <Td isNumeric>{e.amount?.toFixed(2) + ` (${e.part}%)`}</Td>
                                                                            </Tr>
                                                                        ))
                                                                    }
                                                                </Tbody>
                                                            </Table>
                                                        </PopoverBody>
                                                    </PopoverContent>
                                                </Popover>
                                            </Td>
                                            <Td>{name}</Td>
                                            <Td isNumeric>{amount?.toFixed(2)}</Td>
                                            <Td isNumeric>{`${partOfExpenses?.toFixed(2)}%`}</Td>
                                            <Td isNumeric>{`${partOfRevenues?.toFixed(2)}%`}</Td>
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
            </Flex>
        </>
        // </Container>
    )
}