import { all, fork } from '@redux-saga/core/effects';

import appRootSaga from './appSaga';
import authRootSaga from './authSaga';
import followRootSaga from './followSaga';
import profileRootSafa from './profileSaga';
import usersRootSaga from './usersSaga';



export default function* rootSaga() {
    yield all([
        fork(appRootSaga),
        fork(authRootSaga),
        fork(usersRootSaga),
        fork(profileRootSafa),
        fork(followRootSaga)
    ]);
}