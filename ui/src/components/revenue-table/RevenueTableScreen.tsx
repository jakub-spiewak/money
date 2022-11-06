import {CurrentDateComponent} from "../util/CurrentDateComponent";
import {Button, Center, HStack} from "@chakra-ui/react";
import {theme} from "../../theme";
import {useFormModalStateType} from "../../utils/Hooks";
import {ScheduledRevenueRequest} from "../../redux/generated/redux-api";
import {ScheduledRevenue} from "./scheduled/ScheduledRevenue";
import {SingleRevenue} from "./single/SingleRevenue";
import {useAppDispatch} from "../../redux/hooks";
import {openModal} from "../../redux/slice/modal-slice";
import {RevenueTableScreenNavigation} from "./RevenueTableScreenNavigation";

export const RevenueTableScreen = () => {

    const dispatch = useAppDispatch()
    const scheduledRevenueModal = useFormModalStateType<ScheduledRevenueRequest>()

    return (
        <>
            <RevenueTableScreenNavigation/>
            <CurrentDateComponent/>
            <Center
                flexDirection={'column'}
                gap={8}
                pt={8}
            >
                <ScheduledRevenue/>
                <SingleRevenue/>
                <HStack minW={["100vw", null, null, theme.breakpoints.lg]}>
                    <Button onClick={() => scheduledRevenueModal.open()}>Add scheduled revenue</Button>
                    <Button onClick={() => dispatch(openModal({modal: "SINGLE_REVENUE"}))}>Add single revenue</Button>
                </HStack>
            </Center>
        </>
    )
}