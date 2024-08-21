import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "~/literals";
import { Post } from "~/types";

export const paramDataState: Post = {
    data: [],
    loading: STATUS.IDLE,
    error: '',
    id: ''
};

export const paramDataSlice = createSlice({
    name: 'paramdata',
    initialState: paramDataState,
    reducers: {
        fetchParamData: (state, { payload }) => {
            state.loading = STATUS.RUNNING;
            state.id = payload;
            state.data = [];
        },
        fetchParamDataSuccess: (state, { payload: { data } }) => {
            state.loading = STATUS.READY;
            state.data = data;
        },
        fetchParamDataFailure: state => {
            state.error = STATUS.ERROR;
            state.data = [];
            state.loading = STATUS.IDLE;
        },
        updateParamPost: (state) => {
            state.loading = STATUS.RUNNING;
        },
        updateParamPostSuccess: (state, action) => {
            state.loading = STATUS.READY;
            state.data =  Array.isArray(action.payload) ? action.payload : [action.payload];
        },
        updateParamPostFailure: (state, action) => {
            state.error = action.payload;
            state.loading = STATUS.IDLE;
        },
    }
});

export const { fetchParamData, fetchParamDataSuccess, fetchParamDataFailure, updateParamPost, updateParamPostSuccess, updateParamPostFailure } = paramDataSlice.actions;
export default paramDataSlice.reducer;
