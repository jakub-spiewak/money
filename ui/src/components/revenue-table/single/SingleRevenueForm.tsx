import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useToast,
} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {
    SingleRevenueRequest,
    useCreateSingleRevenueMutation,
    useUpdateSingleRevenueMutation
} from "../../../redux/generated/redux-api";
import {AmountField} from "../../util/fields/amount/AmountField";
import {NameField} from "../../util/fields/NameField";
import {SubmitButton} from "../../util/controller/SubmitButton";
import {DateField} from "../../util/fields/DateField";
import {RevenueField} from "../../util/fields/RevenueField";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {closeModal} from "../../../redux/slice/modal-slice";
import {sanitizeFormValues} from "../../../utils/util";

export const SingleRevenueForm = () => {
    const {isOpen, value, id} = useAppSelector(state => state.modal.SINGLE_REVENUE)
    const dispatch = useAppDispatch()
    const toast = useToast()

    const [saveSingleRevenue, createResult] = useCreateSingleRevenueMutation()
    const [updateSingleRevenue, updateResult] = useUpdateSingleRevenueMutation()

    const {
        handleSubmit,
        formState: {isSubmitting},
        reset,
        control
    } = useForm<SingleRevenueRequest>({
        defaultValues: {
            name: undefined,
            amount: undefined,
            parentRevenue: undefined
        }
    })

    const close = () => dispatch(closeModal("SINGLE_REVENUE"))

    const onSubmit = async (revenue: SingleRevenueRequest) => {
        const request = sanitizeFormValues(revenue)
        if (id) await updateSingleRevenue({id, singleRevenueRequest: request})
        else await saveSingleRevenue({singleRevenueRequest: request})
        close()
    }

    useEffect(() => {
        if (createResult?.isSuccess) {
            toast({
                title: 'Success!',
                description: `An revenue has been created.`,
                status: "success",
                position: "top"
            })
        }
    }, [toast, createResult])

    useEffect(() => {
        if (updateResult?.isSuccess) {
            toast({
                title: 'Success!',
                description: `An revenue has been updated.`,
                status: "success",
                position: "top"
            })
        }
    }, [toast, updateResult])

    useEffect(() => {
        if (isOpen) reset(value || {amount: undefined, date: undefined})
    }, [reset, value, isOpen])

    return (
        <Modal
            isOpen={isOpen}
            onClose={close}
        >
            <ModalOverlay backdropFilter={"blur(3px)"}/>
            <ModalContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>Add revenue</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <NameField control={control}/>
                        <AmountField control={control}/>
                        <RevenueField
                            name={"parentRevenue"}
                            label={"Parent revenue"}
                            control={control}
                            defaultValue={value?.parentRevenue}
                        />
                        <DateField control={control}/>
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