import {MobileDynamicTableItem} from "./MobileDynamicTableItem";
import {useState} from "react";
import {ResourceType} from "../../../../redux/slice/types";
import {Box, Flex, Spacer, Spinner, Table, TableContainer, Tbody, Text, Th, Thead, Tr} from "@chakra-ui/react";
import {theme} from "../../../../theme";
import {AnyApiResource} from "../types";

interface Props {
    resource: AnyApiResource,
    resourceType: ResourceType,
    name?: string
}

export const MobileDynamicTable = (props: Props) => {
    const {resource: {data, status: {isLoading}}, resourceType, name} = props
    const state = useState<string>()

    return (
        <Box
            borderWidth={1}
            borderRadius={16}
            mx={4}
        >
            <Flex
                p={4}
                mb={2}
                alignItems={"center"}
                backgroundColor={"gray.900"}
                borderTopRadius={16}
            >
                <Text
                    fontSize={"2xl"}
                    fontWeight={"hairline"}
                >
                    {name}
                </Text>
                <Spacer/>
                {isLoading && <Spinner/>}
            </Flex>
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