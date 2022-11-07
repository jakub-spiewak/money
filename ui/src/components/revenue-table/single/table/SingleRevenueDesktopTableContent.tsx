import {RevenueTableContentProps} from "../../types";
import {SingleRevenueResponse} from "../../../../redux/generated/redux-api";
import {Fragment} from "react";
import {Td, Tr} from "@chakra-ui/react";
import {ActionButtonsTableCell} from "../../../util/table/ActionButtonsTableCell";
import {DateTableCell} from "../../../util/table/DateTableCell";

export const SingleRevenueDesktopTableContent = (props: RevenueTableContentProps<SingleRevenueResponse>) => {
    const {data, onEdit, onDelete} = props
    return (
        <Fragment>
            {
                data.map((revenue, index) => {
                    return (
                        <Tr key={`revenue_${index}`}>
                            <Td>{revenue.name}</Td>
                            <Td isNumeric>
                                {revenue.amount}
                            </Td>
                            <Td>
                                <DateTableCell date={revenue.date}/>
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