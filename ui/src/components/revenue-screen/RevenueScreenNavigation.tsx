import {AiOutlineSetting} from "react-icons/ai";
import {GiTakeMyMoney} from "react-icons/gi";
import {TbReportAnalytics} from "react-icons/tb";
import {TfiStatsUp} from "react-icons/tfi";
import {ScreenNavigation} from "../util/ScreenNavigation";
import {openModal} from "../../redux/slice/modal-slice";
import {useAppDispatch} from "../../redux/hooks";

export const RevenueScreenNavigation = () => {
    const dispatch = useAppDispatch()
    return (
        <ScreenNavigation
            icons={[
                {icon: <TbReportAnalytics/>, to: "/expense"},
                {icon: <TfiStatsUp/>, to: ""},
                {icon: <GiTakeMyMoney/>, to: "/revenue-table"},
                {icon: <AiOutlineSetting/>, to: ""},
            ]}
            onAdd={() => dispatch(openModal({modal: "SINGLE_EXPENSE"}))}
        />
    )
};