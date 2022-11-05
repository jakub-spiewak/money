import {TbReportAnalytics} from "react-icons/tb";
import {TfiStatsUp} from "react-icons/tfi";
import {openModal} from "../../redux/slice/modal-slice";
import {GiTakeMyMoney} from "react-icons/gi";
import {AiOutlineSetting} from "react-icons/ai";
import {useAppDispatch} from "../../redux/hooks";
import {ScreenNavigation} from "../util/ScreenNavigation";

export const ExpenseTableScreenNavigation = () => {
    const dispatch = useAppDispatch()

    return (
        <ScreenNavigation
            icons={[
                {icon: <TbReportAnalytics/>, to: "/expense"},
                {icon: <TfiStatsUp/>, to: ""},
                {icon: <GiTakeMyMoney/>, to: "/revenue"},
                {icon: <AiOutlineSetting/>, to: ""},
            ]}
            onAdd={() => dispatch(openModal({modal: "SCHEDULED_EXPENSE"}))}
        />
    );
};