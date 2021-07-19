import { put, call, takeEvery } from '@redux-saga/core/effects';

import { setAppErrorStatus } from '../slices/appSlice';

import {
    setAuthStatus,
    setCurrentUserData,
    setAuthFetchingStatus,
    setAuthErrorMessage
} from '../slices/authSlice';

import authAPI from '../../api/authAPI';



export const authActions = {
    GET_AUTH_STATUS: 'AUTH/GET-AUTH-STATUS',
    GET_LOG_IN: 'AUTH/GET-LOG-IN',
    GET_LOG_OUT: 'AUTH/GET-LOG-OUT'
}

export const authActionCreators = {
    getAuthStatus: () => ({ type: authActions.GET_AUTH_STATUS }),
    getLogIn: payload => ({ type: authActions.GET_LOG_IN, payload }),
    getLogOut: () => ({ type: authActions.GET_LOG_OUT }),
} 



//@ Get auth status

export function* getAuthStatus() {
    yield put(setAuthFetchingStatus(true));

    try {
        const response = yield call(authAPI.me);

        switch(response.resultCode) {
            case 0:
                yield put(setCurrentUserData(response.data));
                yield put(setAuthStatus(true));
                break;
            
            case 1:
                yield yield put(setCurrentUserData());
                yield put(setAuthStatus(false));
                break;

            default: break;
        }
    }
    catch(error) {
        yield put(setAppErrorStatus());
        console.error(error.message);
    }
    finally {
        yield put(setAuthFetchingStatus(false));
    }
}

//@ Get log in

export function* getLogIn({_, payload}) {
    yield put(setAuthFetchingStatus(false));

    try {
        const response = yield call(authAPI.logIn, payload);
        
        switch(response.resultCode) {
            case 0: 
                yield put(authActionCreators.getAuthStatus());
                break;
            
            case 1:
                yield put(setAuthErrorMessage('You entered an incorrect username or password'));
                break;
            
            case 10:
                yield put(setAuthErrorMessage('You entered an incorrect Capcha'));
                break;

            default: break;
        }
    }
    catch(error) {
        console.error(error.message);
    }
    finally {
        yield put(setAuthFetchingStatus(false));
    }
}

//@ Get log out

export function* getLogOut() {
    yield put(setAuthFetchingStatus(true));

    try {
        const response = yield call(authAPI.logOut);
        if (response.resultCode === 0) yield put(authActionCreators.getAuthStatus());
    }
    catch(error) {
        console.error(error.message);
    }
    finally {
        yield put(setAuthFetchingStatus(false));
    }
}

export default function* authRootSaga() {
    yield takeEvery(authActions.GET_AUTH_STATUS, getAuthStatus);
    yield takeEvery(authActions.GET_LOG_IN, getLogIn);
    yield takeEvery(authActions.GET_LOG_OUT, getLogOut);
}