import {combineReducers, configureStore} from "@reduxjs/toolkit";
import currentDateSlice from "./slice/current-date-slice";
import {api} from "./api";

const reducer = combineReducers({
    [api.reducerPath]: api.reducer,
    currentDate: currentDateSlice
})

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(api.middleware)
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
