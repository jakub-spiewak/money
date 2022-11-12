import {Heading, HStack, Text, VStack} from "@chakra-ui/react";
import {DateRange, SingleExpenseResponse, SingleRevenueResponse} from "../../../../redux/generated/redux-api";
import {DateRangeTableCell} from "../../table/DateRangeTableCell";
import {AnyAmountComponent, MobileTableRow} from "../../table/MobileTableRow";
import {ActionButtonsTableCell} from "../../table/ActionButtonsTableCell";
import {ExpenseTableTagsCell} from "../../../expense-table/ExpenseTableTagsCell";
import {AnyResourceResponse, ResourceType} from "../../../../redux/slice/types";
import {RevenueParentTableCell} from "../../table/RevenueParentTableCell";
import {ExpenseParentTableCell} from "../../table/ExpenseParentTableCell";
import {openModal} from "../../../../redux/slice/modal-slice";
import {mapResponseToRequest} from "../util";
import {useAppDispatch} from "../../../../redux/hooks";
import {askForDelete} from "../../../../redux/slice/delete-modal-slice";

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

    const dispatch = useAppDispatch()

    const isOpen = value.id === currentId

    return (
        <MobileTableRow
            name={value.name}
            amount={"amount" in value ? value.amount : undefined}
            isOpen={isOpen}
            onOpenToggle={() => setCurrentId(isOpen ? undefined : value.id)}
            isLast={isLast}
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
                        <ActionButtonsTableCell
                            onEdit={() => {
                                dispatch(openModal({
                                    modal: resourceType,
                                    value: mapResponseToRequest(resourceType, value),
                                    id: value.id
                                }))
                            }}
                            onDelete={() => {
                                dispatch(askForDelete({
                                    type: resourceType,
                                    name: value.name,
                                    id: value.id
                                }))
                            }}
                        />
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