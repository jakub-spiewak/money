import {PersonType} from "../../utils/CommonTypes";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";

type ApiStatus = 'idle' | 'loading' | 'success' | 'error'

interface PersonSliceState {
    persons: PersonType[],
    status: {
        fetch: ApiStatus
    }
}

const initialState: PersonSliceState = {
    persons: [],
    status: {
        fetch: "idle"
    }
}

export const fetchPersons = createAsyncThunk('person/fetchPerson', async (c, a) => {
    return await new Promise<PersonType[]>((resolve) => {
        const timeoutId = setTimeout(() => {
            resolve([{firstName: "Jakub", lastName: "Śpiewak", id: ""}])
            clearTimeout(timeoutId)
        }, 3000)
    })
})

const personSlice = createSlice({
    name: 'person',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchPersons.pending, (state, action) => {
                state.status.fetch = "loading"
            })
            .addCase(fetchPersons.fulfilled, (state, action) => {
                state.status.fetch = "success"
                state.persons = action.payload
            })
            .addCase(fetchPersons.rejected, (state, action) => {
                state.status.fetch = "error"
            })
    }
})

export const selectPersons = (state: RootState) => state.person.persons

// export const {addPerson} = personSlice.actions
export default personSlice.reducer














