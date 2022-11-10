import {Box, Flex, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spacer, Text} from "@chakra-ui/react";
import {AmountTableCell} from "../util/table/AmountTableCell";
import {TfiMore} from "react-icons/tfi";
import {AddIcon, DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {openModal} from "../../redux/slice/modal-slice";
import {askForDelete} from "../../redux/slice/delete-modal-slice";
import {GiTwoCoins} from "react-icons/gi";
import {
    ScheduledRevenueResponse,
    SingleRevenueResponse,
    useReadSingleRevenueQuery,
} from "../../redux/generated/redux-api";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {SingleRevenueItem} from "./SingleRevenueItem";
import {getCurrentDateISOString} from "../../utils/util";

interface Props {
    revenue: ScheduledRevenueResponse
}

export const GroupRevenueItem = (props: Props) => {
    const {revenue} = props

    const {value: currentMonthStr, month, year} = useAppSelector(state => state.currentDate)

    const dispatch = useAppDispatch()

    const now = new Date()
    const todayMonth = now.getUTCMonth() + 1
    const todayYear = now.getUTCFullYear()
    const isCurrentMonthSameAsToday = year === todayYear && month === todayMonth
    const isCurrentMonthOlderThanToday = year < todayYear || (year === todayYear && month < todayMonth)

    const {
        data: singleRevenuesList
    } = useReadSingleRevenueQuery({month: currentMonthStr})

    return (
        <Box
            borderWidth={1}
            borderRadius={16}
            shadow={"xl"}
            mb={2}
        >
            <Flex
                alignItems={"center"}
                justifyContent={"flex-start"}
                py={2}
                pl={2}
            >
                <Flex
                    pl={2}
                    flexDirection={"column"}
                >
                    <Text fontWeight={"bold"}>{revenue.name}</Text>
                    <Box fontWeight={"hairline"}>
                        <AmountTableCell amount={revenue.amount}/>
                    </Box>
                </Flex>
                <Spacer/>
                <Menu>
                    <MenuButton
                        as={IconButton}
                        variant={'outline'}
                        icon={<TfiMore/>}
                        size={"sm"}
                        mr={4}
                    />
                    <MenuList>
                        <MenuItem
                            icon={<AddIcon/>}
                            onClick={() => dispatch(openModal({
                                    modal: "SINGLE_REVENUE",
                                    value: {
                                        parentRevenue: revenue.id,
                                        date: isCurrentMonthSameAsToday
                                            ? getCurrentDateISOString()
                                            : new Date(`${currentMonthStr}-${isCurrentMonthOlderThanToday ? getDaysInMonth(year, month).toString() : '01'}`).toISOString().split("T")[0]
                                    }
                                })
                            )}
                        >
                            Add
                        </MenuItem>
                        <MenuItem
                            icon={<EditIcon/>}
                            onClick={() => dispatch(openModal({
                                    modal: "SCHEDULED_REVENUE",
                                    id: revenue.id,
                                    value: revenue
                                })
                            )}
                        >
                            Edit
                        </MenuItem>
                        <MenuItem
                            icon={<DeleteIcon/>}
                            onClick={() => {
                                dispatch(askForDelete({
                                    type: "SCHEDULED_REVENUE",
                                    id: revenue.id,
                                    name: revenue.name,
                                }))
                            }}
                        >
                            Delete
                        </MenuItem>
                        {
                            revenue.amount.type === "CONSTANT" &&
                            <>
                                <MenuDivider/>
                                <MenuItem
                                    icon={<GiTwoCoins/>}
                                    onClick={() => {
                                        dispatch(openModal({
                                            modal: "SINGLE_REVENUE",
                                            value: {
                                                parentRevenue: revenue.id,
                                                amount: revenue.amount.data.value,
                                                name: revenue.name,
                                                date: getCurrentDateISOString()
                                            }
                                        }))
                                    }}
                                >
                                    Create current revenue
                                </MenuItem>
                            </>
                        }
                    </MenuList>
                </Menu>
            </Flex>
            {
                singleRevenuesList
                    ?.filter((singleRevenue) => singleRevenue.parentRevenue?.id === revenue.id)
                    ?.sort((o1, o2) => new Date(o1.date).getTime() - new Date(o2.date).getTime())
                    ?.map((singleRevenue: SingleRevenueResponse) => {
                        return (
                            <SingleRevenueItem
                                key={`single_revenue_item_${singleRevenue.id}`}
                                revenue={singleRevenue}
                            />
                        )
                    })
            }
        </Box>
    );
};

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month, 0).getDate();
}
