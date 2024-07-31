import { call, CallEffect, ForkEffect, put, PutEffect, takeEvery } from "redux-saga/effects";
import { fetchParamDataSuccess } from "~/store/slices/paramdata";

function* workFetchParamPost (action: any): Generator<CallEffect | PutEffect<any>, void> {
    const id = action.payload;    
    let recipeData = yield call(() => fetch(`http://localhost:5000/api/posts/getUserPost/${id}`));
    recipeData = yield recipeData.json();
    yield put(fetchParamDataSuccess(recipeData));
}

function* paramPost (): Generator<ForkEffect<never>, void, unknown> {
    yield takeEvery('paramdata/fetchParamData', workFetchParamPost);
}

export default paramPost;
