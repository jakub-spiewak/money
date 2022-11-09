import {MobileDynamicTableItem} from "./MobileDynamicTableItem";
import {useState} from "react";
import {AnyResourceResponse, ResourceType} from "../../../../redux/slice/types";
import {Table, TableContainer, Tbody, Th, Thead, Tr} from "@chakra-ui/react";
import {theme} from "../../../../theme";

interface Props {
    data: AnyResourceResponse[],
    resourceType: ResourceType
}

export const MobileDynamicTable = (props: Props) => {
    const {data, resourceType} = props
    const state = useState<string>()

    return (
        <TableContainer width={["100vw", null, null, theme.breakpoints.lg]}>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th isNumeric>Amount</Th>
                        <Th isNumeric>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        data.map((item) => {
                            return (
                                <MobileDynamicTableItem
                                    value={item}
                                    state={state}
                                    resourceType={resourceType}
                                />
                            )
                        })
                    }
                </Tbody>
            </Table>
        </TableContainer>
    );
};