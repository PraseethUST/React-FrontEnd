import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "~/literals";
import { Post } from "~/types";

export const pendingState: Post = {
    data: [],
    loading: STATUS.IDLE,
    error: '',
    id: ''
};

export const pendingSlice = createSlice({
    name: 'pending',
    initialState: pendingState,
    reducers: {
        fetchPendingData: state => {
            state.loading = STATUS.RUNNING;
        },
        fetchPendingDataSuccess: (state, { payload }) => {
            state.loading = STATUS.READY;
            state.data = payload;
        },
        fetchPendingDataFailure: (state, action) => {
            state.error = action.payload;
            state.loading = STATUS.IDLE;
            state.data = [];
        }
    }
});

export const { fetchPendingData, fetchPendingDataSuccess, fetchPendingDataFailure } = pendingSlice.actions;
export default pendingSlice.reducer;
