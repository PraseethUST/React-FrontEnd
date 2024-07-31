import { call, put, takeEvery } from "redux-saga/effects"
import { getAllPostSuccess } from "~/actions"

function* workGetRecipePost () {
    const recipe = yield call(() => fetch('http://localhost:5000/api/posts/getPost'));
    const recipeData = yield recipe.json();
    yield put(getAllPostSuccess(recipeData));
}

function* recipePost () {
    yield takeEvery('allPost/getAllPost', workGetRecipePost);
}

export default recipePost;
