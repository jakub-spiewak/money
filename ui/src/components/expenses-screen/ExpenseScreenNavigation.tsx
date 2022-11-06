import {TfiStatsUp} from "react-icons/tfi";
import {openModal} from "../../redux/slice/modal-slice";
import {GiTakeMyMoney} from "react-icons/gi";
import {AiOutlineSetting} from "react-icons/ai";
import {useAppDispatch} from "../../redux/hooks";
import {DefaultNavigationAddButton, ScreenNavigation} from "../util/ScreenNavigation";
import {BsCalendar2Week} from "react-icons/bs";

export const ExpenseScreenNavigation = () => {
    const dispatch = useAppDispatch()

    return (
        <ScreenNavigation
            icons={[
                {icon: <BsCalendar2Week/>, to: "/expense-table"},
                {icon: <TfiStatsUp/>, to: ""},
                {icon: <GiTakeMyMoney/>, to: "/revenue"},
                {icon: <AiOutlineSetting/>, to: "/tag"},
            ]}
            centerItem={<DefaultNavigationAddButton onAdd={() => dispatch(openModal({modal: "SINGLE_EXPENSE"}))}/>}
        />
    );
};