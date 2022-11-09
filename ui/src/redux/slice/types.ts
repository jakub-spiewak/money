import type {
    ScheduledExpenseRequest,
    ScheduledExpenseResponse,
    ScheduledRevenueRequest,
    ScheduledRevenueResponse,
    SingleExpenseRequest,
    SingleExpenseResponse,
    SingleRevenueRequest,
    SingleRevenueResponse
} from "../generated/redux-api";

export type AnyResourceResponse =
    SingleRevenueResponse |
    SingleExpenseResponse |
    ScheduledRevenueResponse |
    ScheduledExpenseResponse

export type AnyResourceRequest =
    SingleRevenueRequest |
    SingleExpenseRequest |
    ScheduledRevenueRequest |
    ScheduledExpenseRequest

export type ResourceType =
    "SINGLE_REVENUE" |
    "SINGLE_EXPENSE" |
    "SCHEDULED_REVENUE" |
    "SCHEDULED_EXPENSE"