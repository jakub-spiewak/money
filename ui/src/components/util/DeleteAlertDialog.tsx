import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from "@chakra-ui/react"
import {useCallback, useRef, useState} from "react";

interface DeleteAlertDialogProps {
    isOpen: boolean,
    onClose: () => void,
    onYes: () => Promise<void>,
    name: string,
}

export const DeleteAlertDialog = (props: DeleteAlertDialogProps) => {
    const {isOpen, onClose, onYes, name} = props
    const [isDeleting, setIsDeleting] = useState(false)
    const cancelRef = useRef(null)

    const onDeleteClick = useCallback(async () => {
        setIsDeleting(true)
        await onYes()
        onClose()
    }, [onYes, onClose, setIsDeleting])

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
                        Are you sure to delete <b>{name}</b>?
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
                            onClick={onDeleteClick}
                            isLoading={isDeleting}
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