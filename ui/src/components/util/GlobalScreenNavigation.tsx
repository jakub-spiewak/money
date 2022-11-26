import {GiPayMoney, GiTakeMyMoney} from "react-icons/gi";
import {DefaultNavigationAddButton, NavigationIcon, NavigationIconsType, ScreenNavigation} from "./ScreenNavigation";
import {useLocation} from "react-router";
import {Fragment, useMemo} from "react";
import {BsCalendar2Week, BsCalendar3Event, BsCalendar3Range, BsTags} from "react-icons/bs";
import {useAppDispatch} from "../../redux/hooks";
import {openModal} from "../../redux/slice/modal-slice";
import {IconButton, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {HiPresentationChartBar} from "react-icons/hi";

const ExpenseNavigation: NavigationIcon = {icon: <GiPayMoney/>, to: "/expense"}
const ExpenseTableNavigation: NavigationIcon = {icon: <BsCalendar2Week/>, to: "/expense-table"}
const RevenueNavigation: NavigationIcon = {icon: <GiTakeMyMoney/>, to: "/revenue"}
const RevenueTableNavigation: NavigationIcon = {icon: <BsCalendar2Week/>, to: "/revenue-table"}
const AnalyzeNavigation: NavigationIcon = {icon: <HiPresentationChartBar/>, to: "/analyze"}
const TagsNavigation: NavigationIcon = {icon: <BsTags/>, to: "/tag"}


export const GlobalScreenNavigation = () => {
    const {pathname} = useLocation()
    const dispatch = useAppDispatch()

    const icons: NavigationIconsType = useMemo(() => {
        return [
            pathname === ExpenseNavigation.to ? ExpenseTableNavigation : ExpenseNavigation,
            AnalyzeNavigation,
            pathname === RevenueNavigation.to ? RevenueTableNavigation : RevenueNavigation,
            TagsNavigation
        ]
    }, [pathname])

    const centerItem = useMemo(() => {
        if (pathname === ExpenseNavigation.to || pathname === "/") {
            return (
                <DefaultNavigationAddButton onAdd={() => dispatch(openModal({modal: "SINGLE_EXPENSE"}))}/>
            )
        }

        if (pathname === RevenueNavigation.to) {
            return (
                <DefaultNavigationAddButton onAdd={() => dispatch(openModal({modal: "SINGLE_REVENUE"}))}/>
            )
        }

        if (pathname === ExpenseTableNavigation.to) {
            return (
                <Menu>
                    <MenuButton
                        as={IconButton}
                        icon={<AddIcon/>}
                        variant={'outline'}
                        colorScheme={'green'}
                    />
                    <MenuList fontSize={"1.2em"}>
                        <MenuItem
                            icon={<BsCalendar3Range/>}
                            onClick={() => dispatch(openModal({modal: "SINGLE_EXPENSE"}))}
                        >
                            Add single
                        </MenuItem>
                        <MenuItem
                            icon={<BsCalendar3Event/>}
                            onClick={() => dispatch(openModal({modal: "SCHEDULED_EXPENSE"}))}
                        >
                            Add scheduled
                        </MenuItem>
                    </MenuList>
                </Menu>
            )
        }

        if (pathname === RevenueTableNavigation.to) {
            return (
                <Menu>
                    <MenuButton
                        as={IconButton}
                        icon={<AddIcon/>}
                        variant={'outline'}
                        colorScheme={'green'}
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

        return null
    }, [dispatch, pathname])

    return (
        <ScreenNavigation
            centerItem={centerItem || <Fragment/>}
            icons={icons}
        />
    )
}