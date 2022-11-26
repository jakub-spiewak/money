import {Button, HStack, Text, VStack} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useCallback} from "react";
import {decrement, increment} from "../../redux/slice/current-date-slice";

export const CurrentDateComponent = () => {
    const {month, year} = useAppSelector(state => state.currentDate)
    const dispatch = useAppDispatch()

    const onPlusClick = useCallback(() => {
        console.log("penis")
        dispatch(increment())
    }, [dispatch])

    const onMinusClick = useCallback(() => {
        dispatch(decrement())
    }, [dispatch])

    return (
        <VStack
            p={4}
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
        </VStack>
    )
}