import {Button, HStack, Text} from "@chakra-ui/react";
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


    return (
        <HStack
            p={4}
            m={4}
            borderWidth={1}
            borderRadius={8}
            w={"min-content"}
        >
            <Button onClick={onPlusClick}>
                +
            </Button>
            <HStack>
                <Text>{month <= 9 ? `0${month}` : month}</Text>
                <Text> - </Text>
                <Text>{year}</Text>
            </HStack>
            <Button onClick={onMinusClick}>
                -
            </Button>
        </HStack>
    )
}