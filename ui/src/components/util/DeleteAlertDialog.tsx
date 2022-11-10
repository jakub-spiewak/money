import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from "@chakra-ui/react"
import {useCallback, useRef} from "react";

interface DeleteAlertDialogProps {
    isOpen: boolean,
    onClose: () => void,
    onYes: () => Promise<void>,
    name: string,
    isLoading?: boolean
}

export const DeleteAlertDialog = (props: DeleteAlertDialogProps) => {
    const {isOpen, onClose, onYes, name, isLoading} = props
    const cancelRef = useRef(null)

    const onDeleteClick = useCallback(async () => {
        await onYes()
        onClose()
    }, [onYes, onClose])

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay backdropFilter={"blur(3px)"}>
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
                            isLoading={isLoading}
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