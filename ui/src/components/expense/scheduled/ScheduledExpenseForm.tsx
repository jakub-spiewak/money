import {
    Box,
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
import {FormModalStateType} from "../../../utils/Hooks";
import {
    ScheduledExpenseRequest,
} from "../../../redux/generated/redux-api";
import {SubmitButton} from "../../util/controls/SubmitButton";
import {PersonField} from "../../util/fields/PersonField";
import {TagsField} from "../../util/fields/TagsField";
import {NameField} from "../../util/fields/NameField";
import {AmountRangeField} from "../../util/fields/AmountRangeField";
import {sanitizeFormValues} from "../../../utils/util";

interface ExpenseProps {
    state: FormModalStateType<ScheduledExpenseRequest>,
    onSubmit: (expense: ScheduledExpenseRequest) => Promise<void>
}

export const ScheduledExpenseForm = (props: ExpenseProps) => {
    const {state: {isOpen, value, close}, onSubmit: onSubmitFromProps} = props

    const {
        handleSubmit,
        formState: {isSubmitting},
        control,
        reset,
    } = useForm<ScheduledExpenseRequest>()


    const onSubmit = async (expense: ScheduledExpenseRequest) => {
        const request: ScheduledExpenseRequest = {
            ...expense,
            amount: {
                ...expense.amount,
                type: "RANGE"
            }
        }
        await onSubmitFromProps(sanitizeFormValues(request))
        // alert(JSON.stringify(request, null, 4))
        close()
    }

    useEffect(() => {
        if (isOpen) {
            reset(value?.request || {
                amount: undefined,
                person: undefined,
                name: undefined,
                tags: undefined
            })
        }
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
                        <ModalHeader>Add expense</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody pb={6}>
                            <NameField control={control}/>
                            <AmountRangeField control={control}/>
                            <PersonField
                                control={control}
                                defaultValue={value?.request?.person}
                            />
                            <TagsField control={control}/>
                        </ModalBody>

                        <ModalFooter>
                            <SubmitButton isLoading={isSubmitting}/>
                            <Button onClick={close}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </Box>
    )
}