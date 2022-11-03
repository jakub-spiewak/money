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