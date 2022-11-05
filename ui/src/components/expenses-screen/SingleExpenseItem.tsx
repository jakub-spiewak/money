import {SingleExpenseResponse} from "../../redux/generated/redux-api";
import {Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Spacer, Text} from "@chakra-ui/react";
import {toCurrencyString} from "../../utils/util";
import {TfiMore} from "react-icons/tfi";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {openModal} from "../../redux/slice/modal-slice";
import {askForDelete} from "../../redux/slice/delete-modal-slice";
import {useAppDispatch} from "../../redux/hooks";

interface Props {
    expense: SingleExpenseResponse
}

export const SingleExpenseItem = (props: Props) => {
    const {expense} = props

    const dispatch = useAppDispatch()

    return (
        <Flex
            alignItems={"center"}
            gap={2}
            p={2}
        >
            <Flex
                gap={2}
                w={"full"}
            >
                <Text fontWeight={"bold"}>
                    {expense.name}
                </Text>
                <Spacer/>
                <Text>
                    {toCurrencyString(expense.amount)}
                </Text>
            </Flex>
            <Menu>
                <MenuButton
                    as={IconButton}
                    variant={'outline'}
                    icon={<TfiMore/>}
                    size={"sm"}
                />
                <MenuList>
                    <MenuItem
                        icon={<EditIcon/>}
                        onClick={() => {
                            dispatch(openModal({
                                modal: "SINGLE_EXPENSE",
                                id: expense.id,
                                value: {
                                    ...expense,
                                    parentExpense: expense.parentExpense?.id,
                                    tags: expense.tags.map(tag => tag.id)
                                }
                            }))
                        }}
                    >
                        Edit
                    </MenuItem>
                    <MenuItem
                        icon={<DeleteIcon/>}
                        onClick={() => {
                            dispatch(askForDelete({
                                type: "SINGLE_EXPENSE",
                                id: expense.id,
                                name: expense.name,
                            }))
                        }}
                    >
                        Delete
                    </MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    );
};