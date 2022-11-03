import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";

interface DeleteModalState {
    isOpen: boolean,
    id: string,
    name: string
}

interface DeleteModalSliceState {
    SCHEDULED_EXPENSE: DeleteModalState,
    SINGLE_EXPENSE: DeleteModalState,
}

export const initialState: DeleteModalSliceState = {
    SCHEDULED_EXPENSE: {isOpen: false, id: "", name: ""},
    SINGLE_EXPENSE: {isOpen: false, id: "", name: ""}
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
