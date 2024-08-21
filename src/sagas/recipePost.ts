import { call, CallEffect, put, PutEffect, takeEvery } from "redux-saga/effects"
import { deletePostFailure, getAllPost, getAllPostFailure, getAllPostSuccess, updatePostFailure } from "~/actions";

function* workGetRecipePost (): Generator<CallEffect | PutEffect<any>, void> {
    try {
        const response = yield call(() => fetch('http://localhost:5000/api/posts/getPost'));
        const data = yield response.json();
        yield put(getAllPostSuccess(data));
    } catch (error: any) {
        yield put(getAllPostFailure(error.message));
    }
}

function* workUpdatePostStatus(action: any) {
    try {
        const { id, status } = action.payload;
        console.log(action);
        yield call(() => 
            fetch(`http://localhost:5000/api/posts/updateStatus/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            })
        );
        yield put(getAllPost());
    } catch (error: any) {
        yield put(updatePostFailure(error.message));
    }
}

function* workDeletePost(action: any): Generator<CallEffect | PutEffect<any>, void> {
    try {
        const id = action.payload;
        let deletedData = yield call(() => fetch(`http://localhost:5000/api/posts/deletePost/${id}`, { method: 'DELETE' }));
        deletedData = yield deletedData.json();
        yield put(getAllPost());
    } catch (error: any) {
        yield put(deletePostFailure(error.message));
    }
}

function* recipePost () {
    yield takeEvery('allPost/getAllPost', workGetRecipePost);
    yield takeEvery('allPost/updatePostStatus', workUpdatePostStatus);
    yield takeEvery('allPost/deletePost', workDeletePost);
}

export default recipePost;
