export interface RevenueTableContentProps<T> {
    data: T[],
    onEdit: (revenue: T) => void,
    onDelete: (revenue: T) => Promise<void>
}
