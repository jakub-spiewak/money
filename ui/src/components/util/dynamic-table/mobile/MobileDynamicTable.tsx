import {MobileDynamicTableItem} from "./MobileDynamicTableItem";
import {useState} from "react";
import {ResourceType} from "../../../../redux/slice/types";
import {Box, Flex, Spacer, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import {theme} from "../../../../theme";
import {AnyApiResource} from "../types";
import {useDebounce} from "use-debounce";

interface Props {
    resource: AnyApiResource,
    resourceType: ResourceType,
    name?: string
}

export const MobileDynamicTable = (props: Props) => {
    const {resource: {data, status: {isFetching}}, resourceType, name} = props
    const state = useState<string>()

    const [showLoadingSpinner] = useDebounce(isFetching, 500)

    return (
        <Box
            borderWidth={1}
            borderRadius={16}
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
                {showLoadingSpinner && <Spinner/>}
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
                            data.length === 0 &&
                            <Tr>
                                <Td
                                    colSpan={3}
                                    fontSize={"2xl"}
                                    fontWeight={"hairline"}
                                    textAlign={"center"}
                                >
                                    No data
                                </Td>
                            </Tr>
                        }
                        {
                            data.length > 0 &&
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