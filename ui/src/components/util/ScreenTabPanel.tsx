import {ReactNode} from "react";
import {TabPanel} from "@chakra-ui/react";

interface Props {
    children: ReactNode | ReactNode[]
}
export const ScreenTabPanel = (props: Props) => {
    const {children} = props

    return (
        <TabPanel p={0} overflowX={"hidden"}>
            {children}
        </TabPanel>
    )
}