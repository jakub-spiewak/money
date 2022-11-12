import {MobileDynamicTableItem} from "./MobileDynamicTableItem";
import {useState} from "react";
import {ResourceType} from "../../../../redux/slice/types";
import {Box, Table, TableContainer, Tbody, Text, Th, Thead, Tr} from "@chakra-ui/react";
import {theme} from "../../../../theme";
import {AnyApiResource} from "../types";

interface Props {
    resource: AnyApiResource,
    resourceType: ResourceType,
    name?: string
}

export const MobileDynamicTable = (props: Props) => {
    const {resource: {data}, resourceType, name} = props
    const state = useState<string>()

    return (
        <Box
            borderWidth={1}
            borderRadius={16}
            mx={4}
        >
            <Box
                p={4}
                backgroundColor={"gray.900"}
                display={name ? "block" : "none"}
                borderTopRadius={16}
                mb={2}
                // textAlign={"center"}
            >
                <Text
                    fontSize={"2xl"}
                    fontWeight={"hairline"}
                >
                    {name}
                </Text>
            </Box>
            <TableContainer
                overflow={"hidden"}
                width={["100vw", null, null, theme.breakpoints.lg]}
            >
                <Table overflow={"hidden"}>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th isNumeric>Amount</Th>
                            <Th isNumeric/>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            data.map((item, index) => {
                                return (
                                    <MobileDynamicTableItem
                                        key={`dynamic_table_${item.id}`}
                                        value={item}
                                        state={state}
                                        resourceType={resourceType}
                                        isLast={index === data.length - 1}
                                    />
                                )
                            })
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};