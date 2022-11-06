import {TfiStatsUp} from "react-icons/tfi";
import {GiPayMoney, GiTakeMyMoney} from "react-icons/gi";
import {AiOutlineSetting} from "react-icons/ai";
import {useAppDispatch} from "../../redux/hooks";
import {ScreenNavigation} from "../util/ScreenNavigation";
import {IconButton, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {openModal} from "../../redux/slice/modal-slice";
import {BsCalendar3Event, BsCalendar3Range} from "react-icons/bs";

export const AddMenu = () => {
    const dispatch = useAppDispatch()
    return (
        <Menu>
            <MenuButton
                as={IconButton}
                icon={<AddIcon/>}
            />
            <MenuList fontSize={"1.2em"}>
                <MenuItem
                    icon={<BsCalendar3Range/>}
                    onClick={() => dispatch(openModal({modal: "SINGLE_REVENUE"}))}
                >
                    Add single
                </MenuItem>
                <MenuItem
                    icon={<BsCalendar3Event/>}
                    onClick={() => dispatch(openModal({modal: "SCHEDULED_REVENUE"}))}
                >
                    Add scheduled
                </MenuItem>
            </MenuList>
        </Menu>
    )
}

export const RevenueTableScreenNavigation = () => {
    return (
        <ScreenNavigation
            icons={[
                {icon: <GiPayMoney/>, to: "/expense"},
                {icon: <TfiStatsUp/>, to: ""},
                {icon: <GiTakeMyMoney/>, to: "/revenue"},
                {icon: <AiOutlineSetting/>, to: "/tag"},
            ]}
            centerItem={<AddMenu/>}
        />
    );
};