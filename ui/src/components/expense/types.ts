export interface ExpenseTableContentProps<T> {
    expenses: T[],
    onEdit: (expense: T) => void,
    onDelete: (expense: T) => Promise<void>
}

export interface ExpenseTableProps<T> extends ExpenseTableContentProps<T>{
   isLoading?: boolean
}