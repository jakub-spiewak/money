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
import {
    ScheduledRevenueRequest,
    useCreateScheduledRevenueMutation,
    useUpdateScheduledRevenueMutation
} from "../../../redux/generated/redux-api";
import {NameField} from "../../util/fields/NameField";
import {SubmitButton} from "../../util/controller/SubmitButton";
import {DateRangeField} from "../../util/fields/DateRangeField";
import {TypedAmountField} from "../../util/fields/TypedAmountField";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {closeModal} from "../../../redux/slice/modal-slice";
import {sanitizeFormValues} from "../../../utils/util";

export const ScheduledRevenueForm = () => {

    const dispatch = useAppDispatch()
    const {isOpen, value, id} = useAppSelector(state => state.modal.SCHEDULED_REVENUE)

    const [saveScheduledRevenue] = useCreateScheduledRevenueMutation()
    const [updateScheduledRevenue] = useUpdateScheduledRevenueMutation()

    const close = () => {
        dispatch(closeModal("SCHEDULED_REVENUE"))
    }

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
        const request = sanitizeFormValues(revenue)
        if (id) await updateScheduledRevenue({id, scheduledRevenueRequest: request})
        else await saveScheduledRevenue({scheduledRevenueRequest: request})
        close()
    }

    useEffect(() => {
        if (isOpen) reset(value || {
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