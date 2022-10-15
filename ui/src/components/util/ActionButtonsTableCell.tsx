import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {Box, IconButton, useDisclosure} from "@chakra-ui/react";
import {DeleteAlertDialog} from "./DeleteAlertDialog";

interface Props {
    onEdit: () => void,
    onDelete: () => void,
    deleteMessage: string,
}

export const ActionButtonsTableCell = (props: Props) => {
    const {onEdit, onDelete, deleteMessage} = props
    const {onClose, isOpen, onOpen} = useDisclosure()
    return (
        <>
            <Box>
                <IconButton
                    aria-label={'edit'}
                    icon={<EditIcon/>}
                    colorScheme={'teal'}
                    mr={2}
                    onClick={onEdit}
                />
                <IconButton
                    aria-label={'delete'}
                    icon={<DeleteIcon/>}
                    colorScheme={'red'}
                    onClick={onOpen}
                />
            </Box>
            <DeleteAlertDialog
                isOpen={isOpen}
                onClose={onClose}
                onYes={onDelete}
                message={deleteMessage}
            />
        </>
    )
}