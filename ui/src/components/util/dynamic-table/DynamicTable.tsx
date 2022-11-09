import {useBreakpointValue} from "@chakra-ui/react";
import {MobileDynamicTable} from "./mobile/MobileDynamicTable";
import {DesktopDynamicTable} from "./desktop/DesktopDynamicTable";
import {AnyResourceResponse, ResourceType} from "../../../redux/slice/types";

interface Props {
    data: AnyResourceResponse[],
    resourceType: ResourceType
}

export const DynamicTable = (props: Props) => {
    const {data, resourceType} = props
    const isMobile = useBreakpointValue({base: true, md: false}, {fallback: 'md'})

    return isMobile ?
        <MobileDynamicTable
            data={data}
            resourceType={resourceType}
        /> :
        <DesktopDynamicTable
            data={data}
            resourceType={resourceType}
        />
}