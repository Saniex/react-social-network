import { call, all, put, takeEvery } from '@redux-saga/core/effects';

import { 
    setAppInitStatus,
    setAppErrorStatus
} from '../slices/appSlice';

import { getAuthStatus } from './authSaga';



export const appActions = {
    INIT_APP: 'APP/INIT_APP'
}

export const appActionCreators = {
    initApp: () => ({ type: appActions.INIT_APP })
}



export function* initApp() {
    try {
        yield all([
            call(getAuthStatus)
        ]);
    
        yield put(setAppInitStatus());
    }
    catch(error) {
        yield put(setAppErrorStatus());
        console.error(error.message);
    }
}

export default function* appRootSaga() {
    yield takeEvery(appActions.INIT_APP, initApp);
}