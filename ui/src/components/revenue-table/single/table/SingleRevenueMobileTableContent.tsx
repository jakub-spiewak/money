import {RevenueTableContentProps} from "../../types";
import {SingleRevenueResponse} from "../../../../redux/generated/redux-api";
import {Fragment, useState} from "react";
import {MobileTableRow} from "../../../util/table/MobileTableRow";
import {Box, Heading, HStack, Text, VStack} from "@chakra-ui/react";
import {ActionButtonsTableCell} from "../../../util/table/ActionButtonsTableCell";
import {toCurrencyString} from "../../../../utils/util";

export const SingleRevenueMobileTableContent = (props: RevenueTableContentProps<SingleRevenueResponse>) => {
    const {data, onEdit, onDelete} = props
    const [currentItemId, setCurrentItemId] = useState<string>()
    return (
        <Fragment>
            {
                data.map((revenue) => {
                    const isOpen = revenue.id === currentItemId
                    return (
                        <MobileTableRow
                            amount={revenue.amount}
                            name={revenue.name}
                            isOpen={isOpen}
                            onOpenToggle={() => setCurrentItemId(isOpen ? undefined : revenue.id)}
                            content={
                                <Box py={4}>
                                    <HStack
                                        justifyContent={"space-between"}
                                        gap={8}
                                    >
                                        <Heading>
                                            <Text>{revenue.name}</Text>
                                        </Heading>
                                        <ActionButtonsTableCell
                                            onEdit={() => onEdit(revenue)}
                                            onDelete={() => onDelete(revenue)}
                                            name={revenue.name || ''}
                                        />
                                    </HStack>
                                    <VStack
                                        alignItems={"start"}
                                        gap={3}
                                    >
                                        <Heading
                                            pt={2}
                                            size={"md"}
                                            fontWeight={"hairline"}
                                        >
                                            {toCurrencyString(revenue.amount)}
                                        </Heading>
                                        <Text>{`Date: ${new Date(revenue.date).toLocaleDateString()}`}</Text>
                                    </VStack>
                                </Box>
                            }
                        />
                    )
                })
            }
        </Fragment>
    );
};