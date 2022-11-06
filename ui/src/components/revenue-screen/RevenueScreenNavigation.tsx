import {AiOutlineSetting} from "react-icons/ai";
import {TfiStatsUp} from "react-icons/tfi";
import {DefaultNavigationAddButton, ScreenNavigation} from "../util/ScreenNavigation";
import {openModal} from "../../redux/slice/modal-slice";
import {useAppDispatch} from "../../redux/hooks";
import {BsCalendar2Week} from "react-icons/bs";
import {GiPayMoney} from "react-icons/gi";

export const RevenueScreenNavigation = () => {
    const dispatch = useAppDispatch()
    return (
        <ScreenNavigation
            icons={[
                {icon: <GiPayMoney/>, to: "/expense"},
                {icon: <TfiStatsUp/>, to: ""},
                {icon: <BsCalendar2Week/>, to: "/revenue-table"},
                {icon: <AiOutlineSetting/>, to: "/tag"},
            ]}
            centerItem={<DefaultNavigationAddButton onAdd={() => dispatch(openModal({modal: "SINGLE_REVENUE"}))}/>}
        />
    )
};