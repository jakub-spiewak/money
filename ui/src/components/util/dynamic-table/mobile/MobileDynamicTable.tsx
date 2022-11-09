import {MobileDynamicTableItem} from "./MobileDynamicTableItem";
import {useState} from "react";
import {ResourceType} from "../../../../redux/slice/types";
import {Table, TableContainer, Tbody, Th, Thead, Tr} from "@chakra-ui/react";
import {theme} from "../../../../theme";
import {AnyApiResource} from "../types";

interface Props {
    resource: AnyApiResource,
    resourceType: ResourceType
}

export const MobileDynamicTable = (props: Props) => {
    const {resource: {data}, resourceType} = props
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
                                    key={`dynamic_table_${item.id}`}
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