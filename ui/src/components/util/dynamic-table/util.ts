import {AnyResourceRequest, AnyResourceResponse, ResourceType} from "../../../redux/slice/types";
import {
    ScheduledExpenseResponse,
    ScheduledRevenueResponse,
    SingleExpenseResponse,
    SingleRevenueResponse
} from "../../../redux/generated/redux-api";

export function mapResponseToRequest(resourceType: ResourceType, value: AnyResourceResponse): AnyResourceRequest {
    switch (resourceType) {
        case "SINGLE_REVENUE":
            const singleRevenue = value as SingleRevenueResponse
            return {
                ...singleRevenue,
                parentRevenue: singleRevenue.parentRevenue?.id
            }
        case "SINGLE_EXPENSE":
            const singleExpense = value as SingleExpenseResponse
            return {
                ...singleExpense,
                parentExpense: singleExpense.parentExpense?.id
            }
        case "SCHEDULED_REVENUE":
            const scheduledRevenue = value as ScheduledRevenueResponse
            return {
                ...scheduledRevenue,
            }
        case "SCHEDULED_EXPENSE":
            const scheduledExpense = value as ScheduledExpenseResponse
            return {
                ...scheduledExpense,
                tags: scheduledExpense.tags.map(t => t.id)
            }
    }
}

