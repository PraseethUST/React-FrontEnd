import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '~/types';

const selectSelf = (state: RootState) => state;

export const selectApp = createSelector(selectSelf, state => state.app);

export const selectGitHub = createSelector(selectSelf, state => state.github);

export const selectAllPost = createSelector(selectSelf, state => state.allPost);

export const selectApprovedPost = createSelector(selectSelf, state => state.approved);

export const selectParamDataPost = createSelector(selectSelf, state => state.paramdata);

export const selectUser = createSelector(selectSelf, state => state.user);
