import { call, CallEffect, ForkEffect, put, PutEffect, takeEvery } from 'redux-saga/effects';
import { fetchApprovedPostFailure, fetchApprovedPostSuccess } from '~/store/slices/approved';

function* workFetchApprovedPost(): Generator<CallEffect | PutEffect<any>, void> {
  try {
    let recipeData = yield call(() => fetch('http://localhost:5000/api/posts/getApprovedPost'));
    recipeData = yield recipeData.json();
    yield put(fetchApprovedPostSuccess(recipeData));
  } catch (err) {
    yield put(fetchApprovedPostFailure());
  }
}

function* approvedPost(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery('approved/fetchApprovedPost', workFetchApprovedPost);
}

export default approvedPost;
