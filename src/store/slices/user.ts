import { createSlice } from '@reduxjs/toolkit';

import { STATUS } from '~/literals';

import { UserState } from '~/types';

export const userState: UserState = {
  isAuthenticated: false,
  role: 2,
  userId: '',
  status: STATUS.IDLE,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    login: (draft, { payload: {id, roleId} }) => {
      draft.status = STATUS.RUNNING;
      draft.role = roleId;
      draft.userId = id;
    },
    loginSuccess: draft => {
      draft.isAuthenticated = true;
      draft.status = STATUS.READY;
    },
    logOut: draft => {
      draft.status = STATUS.RUNNING;
    },
    logOutSuccess: draft => {
      draft.isAuthenticated = false;
      draft.status = STATUS.IDLE;

    },
  },
});

export const { login, loginSuccess, logOut, logOutSuccess } = userSlice.actions;
export default userSlice.reducer;
