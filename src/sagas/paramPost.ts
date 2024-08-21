import { call, CallEffect, ForkEffect, put, PutEffect, takeEvery } from "redux-saga/effects";
import { fetchParamDataSuccess, updateParamPostFailure, updateParamPostSuccess } from "~/store/slices/paramdata";

function* workFetchParamPost (action: any): Generator<CallEffect | PutEffect<any>, void> {
    const id = action.payload;    
    let recipeData = yield call(() => fetch(`http://localhost:5000/api/posts/getUserPost/${id}`));
    recipeData = yield recipeData.json();
    yield put(fetchParamDataSuccess(recipeData));
}

function* workUpdatePost( { payload }: any ): Generator {
    console.log(payload);
    try {
        let i =  yield call(() => 
            fetch(`http://localhost:5000/api/posts/update/${payload}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })
        );
        i = yield i.json();
        yield put(updateParamPostSuccess(i.data));
    } catch (error: any) {
        yield put(updateParamPostFailure(error.message));
    }
}

function* paramPost (): Generator<ForkEffect<never>, void, unknown> {
    yield takeEvery('paramdata/fetchParamData', workFetchParamPost);
    yield takeEvery('paramdata/updateParamPost', workUpdatePost);
}

export default paramPost;
