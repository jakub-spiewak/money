import {SingleRevenueResponse} from "../../redux/generated/redux-api";
import {Box, Divider, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Spacer, Text} from "@chakra-ui/react";
import {toCurrencyString} from "../../utils/util";
import {TfiMore} from "react-icons/tfi";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {openModal} from "../../redux/slice/modal-slice";
import {askForDelete} from "../../redux/slice/delete-modal-slice";
import {useAppDispatch} from "../../redux/hooks";

interface Props {
    revenue: SingleRevenueResponse
}

export const SingleRevenueItem = (props: Props) => {
    const {revenue} = props

    const dispatch = useAppDispatch()

    return (
        <Box px={2}>
            <Divider/>
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
                        {revenue.name}
                    </Text>
                    <Spacer/>
                    <Text>
                        {toCurrencyString(revenue.amount)}
                    </Text>
                </Flex>
                <Spacer/>
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
                                    modal: "SINGLE_REVENUE",
                                    id: revenue.id,
                                    value: {
                                        ...revenue,
                                        parentRevenue: revenue.parentRevenue?.id,
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
                                    type: "SINGLE_REVENUE",
                                    id: revenue.id,
                                    name: revenue.name,
                                }))
                            }}
                        >
                            Delete
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Box>
    );
};