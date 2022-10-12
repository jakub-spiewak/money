import {Center, Container, Text} from "@chakra-ui/react";

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
                    <Text fontSize={'4xl'}>Revenues: <b>{revenueAmount.toLocaleString()}</b></Text>
                    <Text fontSize={'xl'}>Expenses: <b>{expensesAmount.toLocaleString()}</b> ({expensesPercentage}%)</Text>
                    <Text fontSize={'xl'}>Savings: <b>{savingAmount.toLocaleString()}</b> ({savingPercentage}%)</Text>
                </Center>
            </Container>
        </Center>
    )
}