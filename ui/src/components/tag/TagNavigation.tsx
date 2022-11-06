import {TfiStatsUp} from "react-icons/tfi";
import {openModal} from "../../redux/slice/modal-slice";
import {GiPayMoney, GiTakeMyMoney} from "react-icons/gi";
import {AiOutlineSetting} from "react-icons/ai";
import {useAppDispatch} from "../../redux/hooks";
import {DefaultNavigationAddButton, ScreenNavigation} from "../util/ScreenNavigation";

export const TagNavigation = () => {
    const dispatch = useAppDispatch()

    return (
        <ScreenNavigation
            icons={[
                {icon: <GiPayMoney/>, to: "/expense"},
                {icon: <TfiStatsUp/>, to: ""},
                {icon: <GiTakeMyMoney/>, to: "/revenue"},
                {icon: <AiOutlineSetting/>, to: "/tag"},
            ]}
            centerItem={<DefaultNavigationAddButton onAdd={() => dispatch(openModal({modal: "TAG"}))}/>}
        />
    );
};