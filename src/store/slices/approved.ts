import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "~/literals";
import { Post } from "~/types";

export const approvedState: Post = {
    data: [],
    loading: STATUS.IDLE,
    error: '',
    id: '',
};

export const approvedSlice = createSlice({
    name: "approved",
    initialState: approvedState,
    reducers: {
        fetchApprovedPost: state => {
            state.loading = STATUS.RUNNING;
        },
        fetchApprovedPostSuccess: (state, { payload: { data } }) => {
            state.loading = STATUS.READY;
            state.data = data;
        },
        fetchApprovedPostFailure: state => {
            state.error = STATUS.ERROR;
            state.data = [];
            state.loading = STATUS.IDLE;
        }
    }
});

export const { fetchApprovedPost, fetchApprovedPostSuccess, fetchApprovedPostFailure } = approvedSlice.actions;
export default approvedSlice.reducer;
