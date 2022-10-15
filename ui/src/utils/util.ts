export const sanitizeFormValues = <T extends Record<any, any>>(value: T): T => {
    Object.keys(value).forEach(key => {
        if (value[key] === '' || value[key] == null) {
            delete value[key];
        }
    });
    return value
}