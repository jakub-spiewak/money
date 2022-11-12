import {DateRange} from "../../../redux/generated/redux-api";
import {AnyAmountComponent, MobileTableRow} from "./MobileTableRow";
import {Heading, HStack, Text, VStack} from "@chakra-ui/react";
import {ActionButtonsTableCell} from "./ActionButtonsTableCell";
import {DateRangeTableCell} from "./DateRangeTableCell";
import {ExpenseTableTagsCell} from "../../expense-table/ExpenseTableTagsCell";
import {AnyResourceResponse, ResourceType} from "../../../redux/slice/types";

const DateComponent = (props: { date?: string | DateRange }) => {
    const {date} = props

    if (!date) return null
    if (typeof date === 'string') return <Text>{new Date(date).toLocaleDateString()}</Text>
    return <DateRangeTableCell
        date={date}
        emptyDateComponent={null}
    />
}

interface Props {
    item: AnyResourceResponse,
    state: [string | undefined
        , (id?: string) => void],
    onEdit: () => void,
    onDelete: () => Promise<void>,
    resourceType: ResourceType
}

export const MobileTableItem = (props: Props) => {
    const {item, state: [currentId, setCurrentId], onEdit, onDelete, resourceType} = props
    const isOpen = item.id === currentId

    return (
        <MobileTableRow
            value={item}
            isOpen={isOpen}
            onOpenToggle={() => setCurrentId(isOpen ? undefined : item.id)}
            content={
                <VStack
                    py={4}
                    alignItems={"start"}
                >
                    <HStack
                        justifyContent={"space-between"}
                    >
                        <Text>{item.name}</Text>
                        <ActionButtonsTableCell
                            onEdit={() => onEdit()}
                            onDelete={() => onDelete()}
                        />
                    </HStack>
                    <Heading
                        size={"lg"}
                        fontWeight={"hairline"}
                    >
                        <AnyAmountComponent amount={item.amount}/>
                    </Heading>
                    <DateComponent date={item.date}/>
                    {"tags" in item && <ExpenseTableTagsCell tags={item.tags}/>}
                </VStack>
            }
            resourceType={resourceType}
        />
    );
};