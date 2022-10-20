import {CurrentDateComponent} from "../util/CurrentDateComponent";
import {Button, Center, HStack} from "@chakra-ui/react";
import {theme} from "../../theme";
import {useFormModalStateType} from "../../utils/Hooks";
import {ScheduledRevenueRequest, SingleRevenueRequest} from "../../redux/generated/redux-api";
import {ScheduledRevenue} from "./scheduled/ScheduledRevenue";
import {SingleRevenue} from "./single/SingleRevenue";

export const RevenueScreen = () => {

    const scheduledRevenueModal = useFormModalStateType<ScheduledRevenueRequest>()
    const singleRevenueModal = useFormModalStateType<SingleRevenueRequest>()

    return (
        <>
            <CurrentDateComponent/>
            <Center
                flexDirection={'column'}
                gap={8}
                pt={8}
            >
                <ScheduledRevenue modal={scheduledRevenueModal}/>
                <SingleRevenue modal={singleRevenueModal}/>
                <HStack
                    flexDirection={"row"}
                    justifyContent={"end"}
                    minW={["100vw", null, null, theme.breakpoints.lg]}
                >
                    <Button onClick={() => scheduledRevenueModal.open()}>Add scheduled expense</Button>
                    <Button onClick={() => singleRevenueModal.open()}>Add single expense</Button>
                </HStack>
            </Center>
        </>
    )
}