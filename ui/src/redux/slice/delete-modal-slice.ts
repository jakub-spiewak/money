import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {ResourceType} from "./types";

interface DeleteModalState {
    isOpen: boolean,
    id: string,
    name: string
}

type DeleteModalSliceState = Record<ResourceType | "TAG", DeleteModalState>

const deleteModalInitialState = {isOpen: false, id: "", name: ""}

export const initialState: DeleteModalSliceState = {
    SCHEDULED_EXPENSE: deleteModalInitialState,
    SINGLE_EXPENSE: deleteModalInitialState,
    SCHEDULED_REVENUE: deleteModalInitialState,
    SINGLE_REVENUE: deleteModalInitialState,
    TAG: deleteModalInitialState
}

const modalSlice = createSlice({
    initialState,
    name: 'delete-modal',
    reducers: {
        askForDelete: function (state: Draft<DeleteModalSliceState>, action: PayloadAction<{ type: keyof DeleteModalSliceState, id: string, name: string }>) {
            state[action.payload.type].isOpen = true
            state[action.payload.type].id = action.payload.id
            state[action.payload.type].name = action.payload.name
        },
        closeDeleteModal: (state, action: PayloadAction<keyof DeleteModalSliceState>) => {
            state[action.payload].isOpen = false
            state[action.payload].id = ""
            state[action.payload].name = ""
        }
    }
})

export const {closeDeleteModal, askForDelete} = modalSlice.actions
export default modalSlice.reducer
