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
import {ScheduledRevenueRequest} from "../../../redux/generated/redux-api";
import {FormModalStateType} from "../../../utils/Hooks";
import {NameField} from "../../util/fields/NameField";
import {SubmitButton} from "../../util/controller/SubmitButton";
import {DateRangeField} from "../../util/fields/DateRangeField";
import {TypedAmountField} from "../../util/fields/TypedAmountField";
import {sanitizeFormValues} from "../../../utils/util";

interface Props {
    state: FormModalStateType<ScheduledRevenueRequest>,
    onSubmit: (revenue: ScheduledRevenueRequest) => Promise<void>
}

export const ScheduledRevenueForm = (props: Props) => {
    const {state: {isOpen, close, value}, onSubmit: onSubmitFromProps} = props


    const {
        handleSubmit,
        formState: {isSubmitting},
        reset,
        control
    } = useForm<ScheduledRevenueRequest>({
        defaultValues: {
            name: undefined,
            amount: undefined,
            date: {
                from: undefined,
                to: undefined
            }
        }
    })

    const onSubmit = async (revenue: ScheduledRevenueRequest) => {
        await onSubmitFromProps(sanitizeFormValues(revenue))
        close()
    }

    useEffect(() => {
        if (isOpen) reset(value?.request || {
            amount: undefined,
            date: {
                from: undefined,
                to: undefined
            }
        })
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
                        <TypedAmountField control={control}/>
                        <DateRangeField control={control}/>
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