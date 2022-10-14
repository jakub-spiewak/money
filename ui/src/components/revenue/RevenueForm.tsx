import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {RevenueRequest, useReadPersonQuery} from "../../redux/generated/redux-api";
import {FormModalStateType} from "../../utils/Hooks";
import {NumberFormField} from "../util/form/NumberFormField";
import {SelectFormField} from "../util/form/SelectFormField";
import {TextFormField} from "../util/form/TextFormField";
import {PersonField} from "../util/fields/PersonField";
import {AmountField} from "../util/fields/AmountField";
import {NameField} from "../util/fields/NameField";
import {SubmitButton} from "../util/SubmitButton";

interface Props {
    state: FormModalStateType<RevenueRequest>,
    onSubmit: (revenue: RevenueRequest) => Promise<void>
}

export const RevenueForm = (props: Props) => {
    const {state: {isOpen, close, value}, onSubmit: onSubmitFromProps} = props


    const {
        handleSubmit,
        formState: {isSubmitting},
        reset,
        control
    } = useForm<RevenueRequest>({
        defaultValues: {
            name: undefined,
            amount: undefined,
            personId: undefined
        }
    })

    const onSubmit = async (revenue: RevenueRequest) => {
        await onSubmitFromProps(revenue)
        close()
    }

    useEffect(() => {
        if (isOpen) reset(value?.request || {amount: undefined, personId: undefined})
    }, [reset, value, isOpen])

    return (
        <Box>
            <Modal
                isOpen={isOpen}
                onClose={close}
            >
                <ModalOverlay/>
                <ModalContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader>Add revenue</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody pb={6}>
                            <NameField control={control}/>
                            <AmountField control={control}/>
                            <PersonField control={control}/>
                        </ModalBody>

                        <ModalFooter>
                            <SubmitButton
                                isLoading={isSubmitting}
                                control={control}
                            />
                            <Button onClick={close}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </Box>
    )
}