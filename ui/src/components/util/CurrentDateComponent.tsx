import {
    Button,
    HStack, Input,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text, useDisclosure,
    VStack
} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useCallback, useEffect, useState} from "react";
import {decrement, increment, initialState, reset, setCurrentDate} from "../../redux/slice/current-date-slice";

export const CurrentDateComponent = () => {
    const {month, year} = useAppSelector(state => state.currentDate)
    const dispatch = useAppDispatch()

    const {onClose, isOpen, onOpen} = useDisclosure()
    const [modalDate, setModalDate] = useState<string>()

    const onPlusClick = useCallback(() => {
        dispatch(increment())
    }, [dispatch])

    const onMinusClick = useCallback(() => {
        dispatch(decrement())
    }, [dispatch])

    const onTodayClick = useCallback(() => {
        dispatch(reset())
    }, [dispatch])

    const onSetClick = useCallback(() => {
        onOpen()
    }, [onOpen])

    const onSetCurrentMonth = useCallback(() => {
        if (!modalDate) return
        const date = new Date(modalDate)
        dispatch(setCurrentDate({year: date.getFullYear(), month: date.getMonth() + 1}))
        onClose()
    }, [dispatch, modalDate, onClose])

    useEffect(() => {
        if (!isOpen) setModalDate(undefined)
    }, [isOpen, setModalDate])

    return (
        <>
            <VStack
                p={4}
                m={4}
                borderWidth={1}
                borderRadius={8}
                w={"min-content"}
            >
                <HStack>
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
                <HStack width={"full"}>
                    <Button
                        width={"full"}
                        variant={"outline"}
                        colorScheme={"teal"}
                        disabled={initialState.year === year && initialState.month === month}
                        onClick={onTodayClick}
                    >Today</Button>
                    <Button
                        width={"full"}
                        variant={"outline"}
                        colorScheme={"teal"}
                        onClick={onSetClick}
                    >Set</Button>
                </HStack>
            </VStack>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Set current month</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Input
                            type={"date"}
                            value={modalDate}
                            onChange={(event) => setModalDate(event.target.value)}
                        />
                    </ModalBody>
                    <ModalFooter gap={2}>
                        <Button
                            colorScheme={"blue"}
                            disabled={!modalDate}
                            onClick={onSetCurrentMonth}
                        >Set</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}