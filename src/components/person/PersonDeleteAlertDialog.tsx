import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button
} from "@chakra-ui/react"
import {useRef} from "react";
import {PersonType} from "../../utils/CommonTypes";

interface PersonDeleteAlertDialogProps {
    isOpen: boolean,
    onClose: () => void,
    onYes: () => void,
    person?: PersonType
}

export const PersonDeleteAlertDialog = (props: PersonDeleteAlertDialogProps) => {
    const  { isOpen, onClose, onYes, person} = props
    const cancelRef = useRef(null)
    return (
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader
                            fontSize='lg'
                            fontWeight='bold'
                        >
                            Delete <span>{`${person?.firstName} ${person?.lastName}`}</span>
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button
                                ref={cancelRef}
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                colorScheme='red'
                                onClick={() => {
                                    onClose()
                                    onYes()
                                }}
                                ml={3}
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
    )
}