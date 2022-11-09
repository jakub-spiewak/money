import {Heading, Text} from "@chakra-ui/react";
import {AnyResourceResponseKey} from "../types";
import {toCurrencyString} from "../../../../utils/util";
import {AmountTableCell} from "../../table/AmountTableCell";
import {DateRangeTableCell} from "../../table/DateRangeTableCell";
import {RevenueParentTableCell} from "../../table/RevenueParentTableCell";
import {ExpenseParentTableCell} from "../../table/ExpenseParentTableCell";
import {ExpenseTableTagsCell} from "../../../expense-table/ExpenseTableTagsCell";
import {AnyResourceResponse} from "../../../../redux/slice/types";

interface Props {
    tableValue: AnyResourceResponse,
    tableKey: AnyResourceResponseKey
}

export const DesktopDynamicTableItem = (props: Props) => {
    const {tableValue, tableKey} = props
    // @ts-ignore
    const value = tableValue[tableKey]

    switch (tableKey) {

        case "amount": {
            if (typeof value === 'number') {
                return (
                    <Text>{toCurrencyString(value)}</Text>
                )
            }
            return <AmountTableCell amount={value}/>
        }

        case "name": {
            return <Heading>{value}</Heading>
        }

        case "date": {
            if (typeof value === "string") {
                return (
                    <Text>{new Date(value).toLocaleDateString()}</Text>
                )
            }
            return <DateRangeTableCell date={value}/>
        }

        case "parentRevenue": {
            return <RevenueParentTableCell revenue={value}/>
        }

        case "parentExpense": {
            return <ExpenseParentTableCell expense={value}/>
        }

        case "tags": {
            return <ExpenseTableTagsCell tags={value}/>
        }

        default:
            return null

    }
}