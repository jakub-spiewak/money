export interface SimpleTableProps<T> {
    data: T[],
    onAdd: () => void;
    onEdit: (revenue: T) => void,
    onDelete: (revenue: T) => Promise<void>,
    isLoading?: boolean
}