import { call, CallEffect, ForkEffect, put, PutEffect, takeEvery } from "redux-saga/effects";
import { fetchPendingDataFailure, fetchPendingDataSuccess } from "~/actions";

function* workFetchPendingData(): Generator<CallEffect | PutEffect<any>, void> {
    try {
        const recipeData = yield call(() => fetch('http://localhost:5000/api/posts/getPendingPost'));
        const { data } = yield recipeData.json();
        yield put(fetchPendingDataSuccess(data));
    }
    catch(err) {
        yield put(fetchPendingDataFailure(err));
    }
}

function* pending(): Generator<ForkEffect<never>, void, unknown> {
    yield takeEvery('pending/fetchPendingData', workFetchPendingData);
}

export default pending;
