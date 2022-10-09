import {combineReducers, configureStore} from "@reduxjs/toolkit";
import personReducer from "./slice/person-slice"

const reducer = combineReducers({
    person: personReducer
})

export const store = configureStore({reducer})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
