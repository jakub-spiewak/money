export interface ExpenseTableContentProps<T> {
    items: T[],
    onEdit: (id: string) => void,
    onDelete: (id: string) => Promise<void>
}

export interface ExpenseTableProps<T> extends ExpenseTableContentProps<T>{
   isLoading?: boolean
}