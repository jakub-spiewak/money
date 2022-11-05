import {Button, HStack, Text, VStack} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useCallback} from "react";
import {decrement, increment} from "../../redux/slice/current-date-slice";

export const CurrentDateComponent = () => {
    const {month, year} = useAppSelector(state => state.currentDate)
    const dispatch = useAppDispatch()

    const onPlusClick = useCallback(() => {
        dispatch(increment())
    }, [dispatch])

    const onMinusClick = useCallback(() => {
        dispatch(decrement())
    }, [dispatch])

    // const onTodayClick = useCallback(() => {
    //     dispatch(reset())
    // }, [dispatch])

    return (
        <VStack
            p={4}
            m={4}
            borderWidth={1}
            borderRadius={16}
            shadow={"2xl"}
        >
            <HStack
                justifyContent={"space-between"}
                w={"full"}
            >
                <Button onClick={onMinusClick}>
                    -
                </Button>
                <HStack>
                    <Text>{month <= 9 ? `0${month}` : month}</Text>
                    <Text> - </Text>
                    <Text>{year}</Text>
                </HStack>
                <Button onClick={onPlusClick}>
                    +
                </Button>
            </HStack>
            {/*<Button*/}
            {/*    width={"full"}*/}
            {/*    variant={"outline"}*/}
            {/*    colorScheme={"teal"}*/}
            {/*    disabled={initialState.year === year && initialState.month === month}*/}
            {/*    onClick={onTodayClick}*/}
            {/*>*/}
            {/*    Today*/}
            {/*</Button>*/}
        </VStack>
    )
}