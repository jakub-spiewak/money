import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const currentDate = new Date()

interface CurrentDateState {
    month: number,
    year: number
}

const initialState: CurrentDateState = {
    month: currentDate.getUTCMonth() + 1,
    year: currentDate.getUTCFullYear()
}

const currentDateSlice = createSlice({
    initialState,
    name: 'current-date',
    reducers: {
        increment: (state) => {
            state.month++
            if (state.month > 12) {
                state.month = 1
                state.year++
            }
        },
        decrement: (state) => {
            state.month--
            if (state.month < 1) {
                state.month = 12
                state.year--
            }
        },
        setCurrentMonth: (state, action: PayloadAction<number>) => {
            state.month = action.payload
            if (state.month > 12) state.month = 12
            if (state.month < 1) state.month = 1
        },
        setCurrentYear: (state, action: PayloadAction<number>) => {
            state.year = action.payload
        },
        setCurrentDate: (state, action: PayloadAction<{ year: number, month: number }>) => {
            state.year = action.payload.year
            state.month = action.payload.month
            if (state.month > 12) state.month = 12
            if (state.month < 1) state.month = 1
        }
    }
})

export const {increment, decrement, setCurrentMonth, setCurrentYear, setCurrentDate} = currentDateSlice.actions
export default currentDateSlice.reducer