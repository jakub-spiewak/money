import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {
    ScheduledExpenseRequest,
    ScheduledRevenueRequest,
    SingleExpenseRequest,
    SingleRevenueRequest, TagRequest
} from "../generated/redux-api";

interface ModalState<T> {
    isOpen: boolean,
    value?: Partial<T>,
    id?: string
}

interface ModalSliceState {
    SCHEDULED_EXPENSE: ModalState<ScheduledExpenseRequest>,
    SINGLE_EXPENSE: ModalState<SingleExpenseRequest>,
    SCHEDULED_REVENUE: ModalState<ScheduledRevenueRequest>,
    SINGLE_REVENUE: ModalState<SingleRevenueRequest>,
    TAG: ModalState<TagRequest>
}

const modalInitialState = {isOpen: false}

export const initialState: ModalSliceState = {
    SCHEDULED_EXPENSE: modalInitialState,
    SINGLE_EXPENSE: modalInitialState,
    SCHEDULED_REVENUE: modalInitialState,
    SINGLE_REVENUE: modalInitialState,
    TAG: modalInitialState
}

const modalSlice = createSlice({
    initialState,
    name: 'modal',
    reducers: {
        openModal: function <T extends keyof ModalSliceState, R extends Partial<((ModalSliceState)[T])["value"]>>(state: Draft<ModalSliceState>, action: PayloadAction<{ modal: T, value?: R, id?: string }>) {
            state[action.payload.modal].isOpen = true
            state[action.payload.modal].value = action.payload.value
            state[action.payload.modal].id = action.payload.id
        },
        closeModal: (state, action: PayloadAction<keyof ModalSliceState>) => {
            state[action.payload].isOpen = false
            state[action.payload].value = undefined
            state[action.payload].id = undefined
        }
    }
})

export const {openModal, closeModal} = modalSlice.actions
export default modalSlice.reducer
