import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {personSlice} from "./slice/person-slice"

const reducer = combineReducers({
    [personSlice.reducerPath]: personSlice.reducer
})

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(personSlice.middleware)
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
