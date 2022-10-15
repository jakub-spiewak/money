import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {Box, IconButton} from "@chakra-ui/react";

interface Props {
    onEdit: () => void,
    onDelete: () => void,
}

export const ActionButtonsTableCell = (props: Props) => {
    const {onEdit, onDelete} = props
    return (
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
                onClick={onDelete}
            />
        </Box>
    )
}