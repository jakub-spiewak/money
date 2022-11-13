import {AnyResourceRequest, AnyResourceResponse} from "../../../redux/slice/types";
import {RequestStatusFlags} from "@reduxjs/toolkit/dist/query/core/apiState";

type KeysOfUnion<T> = T extends T ? keyof T : never;

export type AnyResourceRequestKey = KeysOfUnion<AnyResourceRequest>
export type AnyResourceResponseKey = KeysOfUnion<AnyResourceResponse>

export const DynamicTableColumnNames: Record<AnyResourceResponseKey, { name: string, isNumeric?: boolean }> = {
    id: {name: "Id"},
    name: {name: "Name"},
    date: {name: "Date"},
    amount: {name: "Amount", isNumeric: true},
    tags: {name: "Tags"},
    parentExpense: {name: "Parent expense"},
    parentRevenue: {name: "Parent revenue"},
    spentFactor: {name: "Spent factor"},
    spentSum: {name: "Spent sum"},
    status: {name: "Status"}
}

export const ALL_POSSIBLE_COLUMNS: AnyResourceResponseKey[] = [
    "name",
    "amount",
    "date",
    "parentExpense",
    "parentRevenue",
    "tags"
]

export interface ApiResource<T> {
    data: T[],
    status: Omit<RequestStatusFlags, 'status'> & { isFetching: boolean }
}

export interface AnyApiResource extends ApiResource<AnyResourceResponse> {
}
