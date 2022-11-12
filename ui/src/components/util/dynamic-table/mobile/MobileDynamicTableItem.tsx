import {Heading, HStack, Text, VStack} from "@chakra-ui/react";
import {DateRange, SingleExpenseResponse, SingleRevenueResponse} from "../../../../redux/generated/redux-api";
import {DateRangeTableCell} from "../../table/DateRangeTableCell";
import {AnyAmountComponent, MobileTableRow} from "../../table/MobileTableRow";
import {ExpenseTableTagsCell} from "../../../expense-table/ExpenseTableTagsCell";
import {AnyResourceResponse, ResourceType} from "../../../../redux/slice/types";
import {RevenueParentTableCell} from "../../table/RevenueParentTableCell";
import {ExpenseParentTableCell} from "../../table/ExpenseParentTableCell";

const DateComponent = (props: { date?: string | DateRange }) => {
    const {date} = props

    if (!date) return null
    if (typeof date === 'string') return (
        <HStack>
            <Text as={"b"}>Date: </Text>
            <Text>{new Date(date).toLocaleDateString()}</Text>
        </HStack>
    )
    return <DateRangeTableCell
        date={date}
        emptyDateComponent={null}
    />
}

const AmountComponent = ({amount}: Pick<AnyResourceResponse, 'amount'>) => {
    return (
        <Heading
            size={"md"}
            fontWeight={"hairline"}
            pb={2}
        >
            <AnyAmountComponent amount={amount}/>
        </Heading>
    )
}

const ParentExpenseComponent = ({parentExpense}: Pick<SingleExpenseResponse, 'parentExpense'>) => {
    return (
        <HStack>
            <Text as={"b"}>Parent expense: </Text>
            <ExpenseParentTableCell expense={parentExpense}/>
        </HStack>
    )
}

const ParentRevenueComponent = ({parentRevenue}: Pick<SingleRevenueResponse, 'parentRevenue'>) => {
    return (
        <HStack>
            <Text as={"b"}>Parent revenue: </Text>
            <RevenueParentTableCell revenue={parentRevenue}/>
        </HStack>
    )
}

interface Props {
    value: AnyResourceResponse,
    state: [string | undefined, (id?: string) => void],
    resourceType: ResourceType,
    isLast?: boolean
}

export const MobileDynamicTableItem = (props: Props) => {
    const {value, resourceType, state: [currentId, setCurrentId], isLast} = props

    const isOpen = value.id === currentId

    return (
        <MobileTableRow
            value={value}
            isOpen={isOpen}
            onOpenToggle={() => setCurrentId(isOpen ? undefined : value.id)}
            isLast={isLast}
            resourceType={resourceType}
            content={
                <VStack
                    py={4}
                    alignItems={"start"}
                >
                    <HStack
                        justifyContent={"space-between"}
                        w={"full"}
                    >
                        <Heading>{value.name}</Heading>
                    </HStack>
                    {"amount" in value && <AmountComponent amount={value.amount}/>}
                    {"date" in value && <DateComponent date={value.date}/>}
                    {"parentRevenue" in value && <ParentRevenueComponent parentRevenue={value.parentRevenue}/>}
                    {"parentExpense" in value && <ParentExpenseComponent parentExpense={value.parentExpense}/>}
                    {"tags" in value && <ExpenseTableTagsCell tags={value.tags}/>}
                </VStack>
            }
        />

    );
};