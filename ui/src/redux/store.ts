import {combineReducers, configureStore} from "@reduxjs/toolkit";
import currentDateSlice from "./slice/current-date-slice";
import modalSlice from "./slice/modal-slice";
import {api} from "./api";
import deleteModalSlice from "./slice/delete-modal-slice";

const reducer = combineReducers({
    [api.reducerPath]: api.reducer,
    currentDate: currentDateSlice,
    modal: modalSlice,
    deleteModal: deleteModalSlice
})

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(api.middleware)
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
