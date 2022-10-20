import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {SingleRevenueRequest} from "../../../redux/generated/redux-api";
import {FormModalStateType} from "../../../utils/Hooks";
import {PersonField} from "../../util/fields/PersonField";
import {AmountField} from "../../util/fields/amount/AmountField";
import {NameField} from "../../util/fields/NameField";
import {SubmitButton} from "../../util/controller/SubmitButton";
import {DateField} from "../../util/fields/DateField";

interface Props {
    state: FormModalStateType<SingleRevenueRequest>,
    onSubmit: (revenue: SingleRevenueRequest) => Promise<void>
}

export const SingleRevenueForm = (props: Props) => {
    const {state: {isOpen, close, value}, onSubmit: onSubmitFromProps} = props


    const {
        handleSubmit,
        formState: {isSubmitting},
        reset,
        control
    } = useForm<SingleRevenueRequest>({
        defaultValues: {
            name: undefined,
            amount: undefined,
            person: undefined
        }
    })

    const onSubmit = async (revenue: SingleRevenueRequest) => {
        await onSubmitFromProps(revenue)
        close()
    }

    useEffect(() => {
        if (isOpen) reset(value?.request || {amount: undefined, person: undefined, date: undefined})
    }, [reset, value, isOpen])

    return (
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
                        <DateField control={control}/>
                        <PersonField
                            required
                            control={control}
                            defaultValue={value?.request?.person}
                        />
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
    )
}