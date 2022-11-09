import {
    ScheduledExpenseResponse,
    ScheduledRevenueResponse,
    SingleExpenseResponse,
    SingleRevenueResponse
} from "../../../redux/generated/redux-api";
import {MobileTableItem} from "./MobileTableItem";
import {useState} from "react";

interface Props {
    items: SingleRevenueResponse[] | SingleExpenseResponse[] | ScheduledRevenueResponse[] | ScheduledExpenseResponse[],
    onEdit: (id: string) => void,
    onDelete: (id: string) => Promise<void>,
}

export const MobileTableContent = (props: Props) => {
    const {items, onEdit, onDelete} = props
    const state = useState<string>()

    return (
        <>
            {
                items.map((item) => {
                    return (
                        <MobileTableItem
                            item={item}
                            onEdit={() => onEdit(item.id)}
                            onDelete={() => onDelete(item.id)}
                            state={state}
                        />
                    )
                })
            }
        </>
    );
};