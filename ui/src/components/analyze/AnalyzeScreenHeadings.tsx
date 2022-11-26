import {Center, Container, Text} from "@chakra-ui/react";
import {toCurrencyString} from "../../utils/util";

interface Props {
    revenueAmount: number,
    expensesAmount: number,
    savingAmount: number,
    expensesPercentage: number,
    savingPercentage: number
}

export const AnalyzeScreenHeadings = (props: Props) => {
    const {revenueAmount, expensesAmount, savingAmount, expensesPercentage, savingPercentage} = props
    return (
        <Center>
            <Container
                pb={8}
                maxW={"6xl"}
            >
                <Center flexDirection={"column"}>
                    <Text fontSize={'4xl'}>Revenues: <b>{toCurrencyString(revenueAmount)}</b></Text>
                    <Text
                        fontSize={'xl'}>Expenses: <b>{toCurrencyString(expensesAmount)}</b> ({expensesPercentage * 100}%)</Text>
                    <Text
                        fontSize={'xl'}>Savings: <b>{toCurrencyString(savingAmount)}</b> ({savingPercentage * 100}%)</Text>
                </Center>
            </Container>
        </Center>
    )
}