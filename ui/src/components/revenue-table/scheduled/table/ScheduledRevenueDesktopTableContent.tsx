import {RevenueTableContentProps} from "../../types";
import {ScheduledRevenueResponse} from "../../../../redux/generated/redux-api";
import {Fragment} from "react";
import {Td, Tr} from "@chakra-ui/react";
import {AmountTableCell} from "../../../util/table/AmountTableCell";
import {DateRangeTableCell} from "../../../util/table/DateRangeTableCell";
import {ActionButtonsTableCell} from "../../../util/table/ActionButtonsTableCell";

export const ScheduledRevenueDesktopTableContent = (props: RevenueTableContentProps<ScheduledRevenueResponse>) => {
    const {data, onEdit, onDelete} = props
    return (
        <Fragment>
            {
                data.map((revenue, index) => {
                    return (
                        <Tr key={`revenue_${index}`}>
                            <Td>{revenue.name}</Td>
                            <Td isNumeric>
                                <AmountTableCell amount={revenue.amount}/>
                            </Td>
                            <Td>
                                <DateRangeTableCell date={revenue.date}/>
                            </Td>
                            <Td isNumeric>
                                <ActionButtonsTableCell
                                    onEdit={() => onEdit(revenue)}
                                    onDelete={() => onDelete(revenue)}
                                    name={revenue?.name || ''}
                                />
                            </Td>
                        </Tr>
                    )
                })
            }
        </Fragment>
    );
};