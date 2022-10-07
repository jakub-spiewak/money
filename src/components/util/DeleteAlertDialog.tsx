import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button
} from "@chakra-ui/react"
import {useRef} from "react";

interface DeleteAlertDialogProps {
    isOpen: boolean,
    onClose: () => void,
    onYes: () => void,
    message: string,
}

export const DeleteAlertDialog = (props: DeleteAlertDialogProps) => {
    const  { isOpen, onClose, onYes, message} = props
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
                            Delete
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            {message}
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