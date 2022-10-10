export interface PersonType {
    id?: string,
    firstName: string,
    lastName: string
}

export interface TagType {
    id: string,
    name: string,
}

export interface RevenueType {
    id: string,
    name: string,
    personId: string,
    amount: number,
}

export interface ExpenseType {
    id: string,
    name: string,
    personId?: string,
    amount: number,
    tagsIds: string[]
}