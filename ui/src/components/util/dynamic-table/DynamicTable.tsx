import {useBreakpointValue} from "@chakra-ui/react";
import {MobileDynamicTable} from "./mobile/MobileDynamicTable";
import {DesktopDynamicTable} from "./desktop/DesktopDynamicTable";
import {ResourceType} from "../../../redux/slice/types";
import {AnyApiResource} from "./types";

interface Props {
    resource: AnyApiResource,
    resourceType: ResourceType
}

export const DynamicTable = (props: Props) => {
    const {resource, resourceType} = props
    const isMobile = useBreakpointValue({base: true, md: false}, {fallback: 'md'})

    return isMobile ?
        <MobileDynamicTable
            resource={resource}
            resourceType={resourceType}
        /> :
        <DesktopDynamicTable
            resource={resource}
            resourceType={resourceType}
        />
}