import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const currentDate = new Date()

interface CurrentDateState {
    month: number,
    year: number,
    value: string
}

const createStringValue = (month: number, year: number): string => `${year}-${month <= 9 ? `0${month}` : month}`

export const initialState: CurrentDateState = {
    month: currentDate.getUTCMonth() + 1,
    year: currentDate.getUTCFullYear(),
    value: createStringValue(currentDate.getUTCMonth() + 1, currentDate.getUTCFullYear())
}

const currentDateSlice = createSlice({
    initialState,
    name: 'current-date',
    reducers: {
        reset: (state) => {
            state.month = initialState.month
            state.year = initialState.year
            state.value = createStringValue(initialState.month, initialState.year)
        },
        increment: (state) => {
            state.month++
            if (state.month > 12) {
                state.month = 1
                state.year++
            }
            state.value = createStringValue(state.month, state.year)
        },
        decrement: (state) => {
            state.month--
            if (state.month < 1) {
                state.month = 12
                state.year--
            }
            state.value = createStringValue(state.month, state.year)
        },
        setCurrentMonth: (state, action: PayloadAction<number>) => {
            state.month = action.payload
            if (state.month > 12) state.month = 12
            if (state.month < 1) state.month = 1
            state.value = createStringValue(state.month, state.year)
        },
        setCurrentYear: (state, action: PayloadAction<number>) => {
            state.year = action.payload
            state.value = createStringValue(state.month, state.year)
        },
        setCurrentDate: (state, action: PayloadAction<{ year: number, month: number }>) => {
            state.year = action.payload.year
            state.month = action.payload.month
            if (state.month > 12) state.month = 12
            if (state.month < 1) state.month = 1
            state.value = createStringValue(state.month, state.year)
        }
    }
})

export const {increment, decrement, reset, setCurrentMonth, setCurrentYear, setCurrentDate} = currentDateSlice.actions
export default currentDateSlice.reducer