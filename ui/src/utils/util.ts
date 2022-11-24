import {Amount} from "../redux/generated/redux-api";
import {AnyResourceResponse} from "../redux/slice/types";
import {AnyResourceResponseKey} from "../components/util/dynamic-table/types";

export const sanitizeFormValues = <T extends Record<any, any>>(value: T): T => {
    Object.keys(value).forEach(key => {
        if (value[key] === '' || value[key] == null) {
            delete value[key];
        }
    });
    return value
}

export const toCurrencyString = (value?: number, compact?: boolean): string => {
    return (value || 0).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        style: "currency",
        compactDisplay: "long",
        notation: compact ? "compact" : "standard",
        currency: "PLN"
    })
}

export const getCurrentDateISOString = () => new Date().toISOString().split("T")[0]

export const getAmountAvg = (amount?: Amount): number => {
    if (!amount) return 0;

    const {data, type} = amount
    switch (type) {
        case "RANGE":
            return ((data?.min || 0) + (data?.max || 0)) / 2
        case "PERCENTAGE":
            return data?.value || 0
        case "CONSTANT":
            return data?.value || 0
        case "UNKNOWN":
            return 0
        default:
            return 0
    }

}

export const sortByParentExpenseFunction = <T extends AnyResourceResponse>(a: T, b: T): number => {
    if (!("parentExpense" in a) || !("parentExpense" in b)) return 0
    return a.parentExpense?.name.localeCompare(b.parentExpense?.name || "") || 0
}

export const sortByParentRevenueFunction = <T extends AnyResourceResponse>(a: T, b: T): number => {
    if (!("parentRevenue" in a) || !("parentRevenue" in b)) return 0
    return a.parentRevenue?.name.localeCompare(b.parentRevenue?.name || "") || 0
}

export const sortByNameFunction = <T extends AnyResourceResponse>(a: T, b: T): number => {
    if (!("name" in a) || !("name" in b)) return 0
    return a.name.localeCompare(b.name || "") || 0
}

export const sortByAmountFunction = <T extends AnyResourceResponse>(a: T, b: T): number => {
    if (!("amount" in a) || !("amount" in b)) return 0
    if (typeof a.amount === 'number' && typeof b.amount === 'number') return a.amount - b.amount
    return 0
}

export const sortByTagsFunction = <T extends AnyResourceResponse>(a: T, b: T): number => {
    if (!("tags" in a) || !("tags" in b)) return 0
    return a.tags.length - b.tags.length
}


export const sortByDateFunction = <T extends AnyResourceResponse>(a: T, b: T): number => {
    if (!("date" in a) || !("date" in b)) return 0
    if (typeof a.date === 'string' && typeof b.date === 'string') return new Date(a.date).getTime() - new Date(b.date).getTime()
    if (typeof a.date === 'string' || typeof b.date === 'string') return 0

    if ("from" in a.date && "to" in a.date && "from" in b.date && "to" in b.date) {
        if (a.date.from && b.date.from) return new Date(a.date.from).getTime() - new Date(b.date.from).getTime()
        if (a.date.to && b.date.to) return new Date(a.date.to).getTime() - new Date(b.date.to).getTime()
        if (!a.date.from && !a.date.to && (b.date.from || b.date.to)) return 1
        if (!b.date.from && !b.date.to && (a.date.from || a.date.to)) return -1
        if (a.date.from && b.date.to) return 1
        if (a.date.to && b.date.from) return -1
    }
    return 0
}

export const getResourceSortFunction = (key: AnyResourceResponseKey) => {
    switch (key) {
        case "date":
            return sortByDateFunction
        case "amount":
            return sortByAmountFunction
        case "name":
            return sortByNameFunction
        case "parentExpense":
            return sortByParentExpenseFunction
        case "parentRevenue":
            return sortByParentRevenueFunction
        case "tags":
            return sortByTagsFunction
        default:
            return () => 0
    }
}
