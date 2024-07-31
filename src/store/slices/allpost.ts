import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "~/literals";
import { Post } from "~/types";

export const allPostState: Post = {
    data: [],
    loading: STATUS.IDLE,
    error: '',
    id: '',
};

export const allPostSlice = createSlice({
    name: 'allPost',
    initialState: allPostState,
    reducers: {
        getAllPost: (state) => {
            state.loading = STATUS.RUNNING;
            console.log("object");
            state.data = [];
        },
        getAllPostSuccess: (state, { payload: { data } }) => {
            state.loading = STATUS.READY;           
            state.data = data;
        },
        getAllPostFailure: (state) => {
            state.error = STATUS.ERROR;
            state.data = [];
            state.loading = STATUS.IDLE;
        }
    }
});

export const { getAllPost, getAllPostSuccess, getAllPostFailure } = allPostSlice.actions;
export default allPostSlice.reducer;
