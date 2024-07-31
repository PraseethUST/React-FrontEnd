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
        },
        fetchParamDataSuccess: (state, { payload: { data } }) => {
            state.loading = STATUS.READY;            
            state.data = data;
        },
        fetchParamDataFailure: state => {
            state.error = STATUS.ERROR;
            state.data = [];
            state.loading = STATUS.IDLE;
        }
    }
});

export const { fetchParamData, fetchParamDataSuccess, fetchParamDataFailure } = paramDataSlice.actions;
export default paramDataSlice.reducer;
