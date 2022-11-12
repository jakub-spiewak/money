import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {HStack, IconButton} from "@chakra-ui/react";

interface Props {
    onEdit: () => void,
    onDelete: () => void,
}

export const ActionButtonsTableCell = (props: Props) => {
    const {
        onEdit,
        onDelete,
    } = props

    return (
        <HStack justifyContent={"flex-end"}>
            <IconButton
                aria-label={'edit'}
                icon={<EditIcon/>}
                colorScheme={'teal'}
                variant={"outline"}
                mr={1}
                onClick={onEdit}
            />
            <IconButton
                aria-label={'delete'}
                icon={<DeleteIcon/>}
                colorScheme={'red'}
                variant={"outline"}
                onClick={onDelete}
            />
        </HStack>
    )
}