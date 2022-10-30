import {Box, Center, Flex, Heading, HStack, Text, VStack} from "@chakra-ui/react";
import {Doughnut} from "react-chartjs-2"
import {useAppSelector} from "../../redux/hooks";
import {useReadScheduledExpenseQuery, useSummaryQuery} from "../../redux/generated/redux-api";
import {BiHome} from "react-icons/bi";
import {IoSettingsOutline} from "react-icons/io5";
import {GiPayMoney, GiReceiveMoney} from "react-icons/gi";
import {HiOutlinePlus} from "react-icons/hi";

const chartColors = [
    "#fd7f6f",
    "#7eb0d5",
    "#b2e061",
    "#bd7ebe",
    "#ffb55a",
    "#ffee65",
    "#beb9db",
    "#fdcce5",
    "#8bd3c7"
]

const getColor = (index: number) => chartColors[index % chartColors.length]

export const AnalyzeScreen = () => {
    const {year, month} = useAppSelector(state => state.currentDate)

    const {data} = useSummaryQuery()

    const revenueNum = data?.revenue || 0
    const budgetNum = data?.budget || 0

    const reamingNum = data?.reaming || 0
    const spentNum = data?.spent || 0

    const reamingPercentage = (data?.normalizedReaming || 0) * 100
    const spentPercentage = (data?.normalizedSpent || 0) * 100

    const {
        data: expenses,
    } = useReadScheduledExpenseQuery({month: `${year}-${month <= 9 ? `0${month}` : month}`})

    return (
        <>
            <Heading
                px={8}
                w={"full"}
                fontSize={"1.3em"}
                textAlign={"start"}
                pt={3}
            >
                Miesięczny budżet
            </Heading>
            <Center
                display={"flex"}
                flexDirection={"column"}
                gap={2}
                pt={3}
            >
                <Box
                    display={"flex"}
                    alignItems={"center"}
                >
                    <Box
                        position={"relative"}
                        maxW={"70vw"}
                        maxH={"70vw"}
                    >
                        <Doughnut
                            data={{
                                datasets: [{
                                    data: [data?.spent, data?.reaming],
                                    backgroundColor: [chartColors[0], chartColors[1]],
                                    hoverOffset: 16,
                                    borderWidth: 2,
                                    borderRadius: 9999,
                                    spacing: 8
                                }],
                            }}
                            options={{
                                cutout: 88,
                                responsive: true,
                                layout: {
                                    padding: 8
                                },
                                normalized: true,
                                plugins: {
                                    tooltip: {
                                        enabled: false
                                    }
                                },
                            }}
                        />
                        <Box
                            position={"absolute"}
                            left={"50%"}
                            top={"50%"}
                            transform={"translate(-50%, -50%)"}
                            fontSize={"2xl"}
                            fontWeight={"bold"}
                            display={"flex"}
                            flexDirection={"column"}
                            alignItems={"center"}
                            lineHeight={1.2}
                        >
                            <Text pt={6}>{reamingNum.toFixed(2)} zł</Text>
                            <Text
                                fontSize={"md"}
                                fontWeight={"thin"}
                            >z</Text>
                            <Text
                                fontSize={"md"}
                                fontWeight={"thin"}
                            >{spentNum.toFixed(2)} zł</Text>
                        </Box>
                    </Box>
                </Box>
                <HStack
                    w={"full"}
                    justifyContent={"space-evenly"}
                >
                    <VStack>
                        <Box
                            w={12}
                            h={12}
                            p={6}
                            borderRadius={16}
                            backgroundColor={getColor(0)}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            fontWeight={"bold"}
                            color={"white"}
                            borderWidth={2}
                            borderColor={"white"}
                        >
                            {spentPercentage}%
                        </Box>
                        <Text>Wydałeś</Text>
                    </VStack>
                    <VStack>
                        <Box
                            w={12}
                            h={12}
                            p={6}
                            borderRadius={16}
                            backgroundColor={getColor(1)}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            fontWeight={"extrabold"}
                            color={"white"}
                            borderWidth={2}
                            borderColor={"white"}
                        >
                            {reamingPercentage}%
                        </Box>
                        <Text>Zostało</Text>
                    </VStack>
                </HStack>
                <Flex
                    pt={3}
                    w={"100%"}
                    overflowX={"auto"}
                    scrollSnapType={"x mandatory"}
                    px={"1em"}
                >
                    {
                        expenses?.map((expense, index) => {
                            if (!expense) return null

                            return (
                                <Box
                                    mx={".5em"}
                                    scrollSnapAlign={"center"}
                                    flexGrow={0}
                                    flexShrink={0}
                                    flexBasis={"calc(33.33% - 1em)"}
                                    w={'full'}
                                    display={"flex"}
                                    position={"relative"}
                                    borderRadius={16}
                                    borderWidth={2}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    h={32}
                                    overflow={"hidden"}
                                    // ml={index === 0 ? 32 : undefined}
                                    // mr={index === ((expenses?.length || 0) - 1) ? 32 : undefined}
                                >
                                    <Box
                                        backgroundColor={"teal.500"}
                                        borderRadius={14}
                                        h={`${expense.spentPercentage || 0}%`}
                                        w={"full"}
                                        position={"absolute"}
                                        bottom={0}
                                        zIndex={-2}
                                    />
                                    <Text
                                        p={1}
                                        py={3}
                                        fontWeight={"bold"}
                                        // mixBlendMode={"difference"}
                                        textAlign={"center"}
                                        mx={2}
                                        zIndex={10}
                                        backgroundColor={(expense.spentPercentage || 0) < 60 ? "gray.800" : undefined}
                                        borderRadius={16}
                                        textOverflow={"ellipsis"}
                                        overflow={"hidden"}
                                        whiteSpace={"nowrap"}
                                    >
                                        {expense.name}
                                    </Text>
                                </Box>
                            )
                        })
                    }
                </Flex>
                <Box
                    bgColor={"teal.700"}
                    w={"full"}
                    p={2}
                    position={"fixed"}
                    bottom={0}
                >
                    <Flex
                        justifyContent={"space-around"}
                        alignItems={"center"}
                        fontSize={"1.5em"}
                    >
                        <BiHome/>
                        <GiPayMoney/>
                        <Box
                            fontSize={"1.75em"}
                            backgroundColor={"gray.800"}
                            p={2}
                            mt={"-1em"}
                            borderBottomRadius={24}
                        >
                            <Box
                                borderRadius={16}
                                borderWidth={1}
                                borderColor={"white"}
                                mt={2}
                                p={1}
                            >
                                <HiOutlinePlus/>
                            </Box>
                        </Box>
                        <GiReceiveMoney/>
                        <IoSettingsOutline/>
                    </Flex>
                </Box>
            </Center>
        </>
    )
}