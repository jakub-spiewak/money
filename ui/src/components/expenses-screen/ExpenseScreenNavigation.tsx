import {TbReportAnalytics} from "react-icons/tb";
import {TfiStatsUp} from "react-icons/tfi";
import {openModal} from "../../redux/slice/modal-slice";
import {GiTakeMyMoney} from "react-icons/gi";
import {AiOutlineSetting} from "react-icons/ai";
import {useAppDispatch} from "../../redux/hooks";
import {ScreenNavigation} from "../util/ScreenNavigation";

export const ExpenseScreenNavigation = () => {
    const dispatch = useAppDispatch()

    return (
        <ScreenNavigation
            icons={[
                {icon: <TbReportAnalytics/>, to: "/expense-table"},
                {icon: <TfiStatsUp/>, to: ""},
                {icon: <GiTakeMyMoney/>, to: "/revenue"},
                {icon: <AiOutlineSetting/>, to: "/tag"},
            ]}
            onAdd={() => dispatch(openModal({modal: "SINGLE_EXPENSE"}))}
        />
    );
};