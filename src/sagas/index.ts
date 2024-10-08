import { all, fork } from 'redux-saga/effects';

import user from './user';
import recipePost from './recipePost';
import approvedPost from './approvedPost';
import paramPost from './paramPost';
import pending from './pending';

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(user), fork(recipePost), fork(approvedPost), fork(paramPost), fork(pending)]);
}
