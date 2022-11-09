import {Amount, DateRange, TagResponse} from "../../../redux/generated/redux-api";
import {AnyAmountComponent, MobileTableRow} from "./MobileTableRow";
import {Heading, HStack, Text, VStack} from "@chakra-ui/react";
import {ActionButtonsTableCell} from "./ActionButtonsTableCell";
import {DateRangeTableCell} from "./DateRangeTableCell";
import {ExpenseTableTagsCell} from "../../expense-table/ExpenseTableTagsCell";

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
    item: {
        id: string,
        name: string,
        amount: number | Amount,
        date: string | DateRange,
        tags?: TagResponse[],
    },
    state: [string | undefined
        , (id?: string) => void],
    onEdit: () => void,
    onDelete: () => Promise<void>,
}

export const MobileTableItem = (props: Props) => {
    const {item: {id, name, amount, date, tags}, state: [currentId, setCurrentId], onEdit, onDelete} = props

    const isOpen = id === currentId

    return (
        <MobileTableRow
            name={name}
            amount={amount}
            isOpen={isOpen}
            onOpenToggle={() => setCurrentId(isOpen ? undefined : id)}
            content={
                <VStack
                    py={4}
                    alignItems={"start"}
                >
                    <HStack
                        justifyContent={"space-between"}
                    >
                        <Text>{name}</Text>
                        <ActionButtonsTableCell
                            onEdit={() => onEdit()}
                            onDelete={() => onDelete()}
                        />
                    </HStack>
                    <Heading
                        size={"lg"}
                        fontWeight={"hairline"}
                    >
                        <AnyAmountComponent amount={amount}/>
                    </Heading>
                    <DateComponent date={date}/>
                    {tags && <ExpenseTableTagsCell tags={tags}/>}
                </VStack>
            }
        />
    );
};