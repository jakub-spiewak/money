import 'chart.js/auto';
import {
    Box,
    Button, Center,
    Container, Grid, GridItem, Heading,
    HStack,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack,
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
import {useState} from "react";

const monthsToYearMonthString = (value: number) => {
    if (value < 12) return `${Math.round(value)} months`
    const years = Math.floor(value / 12)
    const months = Math.floor(value % 12)

    if (months === 0) return `${years} years`
    return `${years} years, ${months} months`
}
export const AnalyzeScreen = () => {
    const {expenses, revenues, tags} = useGlobalContext()

    const [revenueAdditional, setRevenueAdditional] = useState(0)
    const [expenseAdditional, setExpenseAdditional] = useState(0)

    const revenue = revenues.map((r) => r.amount).reduce((p, c) => p + c, 0)
    const expense = expenses.map((r) => r.amount).reduce((p, c) => p + c, 0)

    const revenue2 = revenue + revenueAdditional
    const expense2 = expense + expenseAdditional

    return (
        // <Container maxW={'xl'}>
        <>
            <Center>
                <Container
                    pb={8}
                    maxW={"4xl"}
                >
                    <Center flexDirection={"column"}>
                        <Text fontSize={'4xl'}>Revenues: <b>{revenue2.toLocaleString()}</b></Text>
                        <Text fontSize={'xl'}>Expenses: <b>{expense2.toLocaleString()}</b> ({(100 * expense2 / revenue2).toFixed(2)}%)</Text>

                        <Text fontSize={'xl'}>Yearly
                            savings: <b>{(12 * (revenue2 - expense2)).toLocaleString()}</b></Text>
                        <Text fontSize={'xl'}>100 000
                            in: <b>{monthsToYearMonthString(100_000 / (revenue2 - expense2))}</b></Text>
                        <Text fontSize={'xl'}>1 000 000
                            in: <b>{monthsToYearMonthString(1_000_000 / (revenue2 - expense2))}</b></Text>
                        <VStack
                            alignItems={"flex-start"}
                            width={"100%"}
                        >
                            <Slider
                                defaultValue={0}
                                min={0}
                                max={3 * revenue}
                                step={0.01}
                                mt={12}
                                value={revenueAdditional}
                                onChange={(v) => setRevenueAdditional(v)}
                            >
                                <SliderMark value={revenue}>
                                    1x
                                </SliderMark>
                                <SliderMark value={2 * revenue}>
                                    2x
                                </SliderMark>
                                <SliderMark value={3 * revenue}>
                                    3x
                                </SliderMark>
                                <SliderMark
                                    value={revenueAdditional}
                                    mt={-10}
                                >
                                    {revenueAdditional.toLocaleString()}
                                </SliderMark>
                                <SliderTrack bg='green.100'>
                                    <Box
                                        position='relative'
                                        right={10}
                                    />
                                    <SliderFilledTrack bg='green.500'/>
                                </SliderTrack>
                                <SliderThumb boxSize={6}/>
                            </Slider>
                        </VStack>
                        <VStack
                            alignItems={"flex-start"}
                            width={"100%"}
                        >
                            <Slider
                                defaultValue={0}
                                min={-expense}
                                max={3 * expense}
                                mt={12}
                                step={0.01}
                                value={expenseAdditional}
                                onChange={(v) => setExpenseAdditional(v)}
                            >
                                <SliderMark value={-expense}>
                                    -1x
                                </SliderMark>
                                <SliderMark value={0}>
                                    0x
                                </SliderMark>
                                <SliderMark value={expense}>
                                    1x
                                </SliderMark>
                                <SliderMark value={2 * expense}>
                                    2x
                                </SliderMark>
                                <SliderMark value={3 * expense}>
                                    3x
                                </SliderMark>
                                <SliderMark
                                    value={expenseAdditional}
                                    mt={-10}
                                >
                                    {expenseAdditional.toLocaleString()}
                                </SliderMark>
                                <SliderTrack bg='red.100'>
                                    <Box
                                        position='relative'
                                        right={10}
                                    />
                                    <SliderFilledTrack bg='red.500'/>
                                </SliderTrack>
                                <SliderThumb boxSize={6}/>
                            </Slider>
                        </VStack>
                    </Center>
                </Container>
            </Center>
            <Container maxW={"4xl"}>
                <Grid
                    templateRows={"repeat(2, 1fr)"}
                    templateColumns={"repeat(3, 1fr)"}
                    gap={8}
                >
                    <GridItem
                        rowSpan={2}
                        colSpan={1}
                    >
                        <Doughnut
                            id={"chart"}
                            data={{
                                labels: ["Expense", "Savings"],
                                datasets: [{
                                    data: [expense2, revenue2 - expense2],
                                    backgroundColor: ["red", "green"]
                                }],
                            }}
                        />
                    </GridItem>
                    <GridItem
                        rowSpan={2}
                        colSpan={2}
                    >
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
                                                    <Tr _hover={{background: "blue.300"}}>
                                                        <Td>
                                                            <Popover isLazy>
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
                                                                        <Table
                                                                            variant={'simple'}
                                                                            size={'sm'}
                                                                        >
                                                                            {
                                                                                expenses
                                                                                    .filter((e) => e.tagsIds.includes(tag.id))
                                                                                    .sort((a, b) => b.amount - a.amount)
                                                                                    .map((e, index, self) => (
                                                                                        <Tr key={`summary_expense_row_${index}`}>
                                                                                            <Td>{e.name}</Td>
                                                                                            <Td isNumeric>{e.amount.toFixed(2) + ` (${(e.amount / self.map(s => s.amount).reduce((s1, s2) => s1 + s2, 0) * 100).toFixed(2)}%)`}</Td>
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
                                <Tfoot>
                                    <Tr>
                                        <Th>Info</Th>
                                        <Th>Name</Th>
                                        <Th isNumeric>Amount</Th>
                                        <Th isNumeric>%</Th>
                                    </Tr>
                                </Tfoot>
                            </Table>
                        </TableContainer>
                    </GridItem>
                </Grid>
            </Container>
        </>
        // </Container>
    )
}