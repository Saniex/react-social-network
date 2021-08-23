import { call, put, takeEvery } from '@redux-saga/core/effects';

import { setAppErrorStatus } from '../slices/appSlice';

import { 
    setUserFollowingStatus, 
    setUserFollowFetchingStatus 
} from '../slices/followSlice';

import followAPI from '../../api/followAPI';



export const followActions = {
    GET_USER_FOLLOWING_STATUS: 'USERS/GET-USER-FOLLOWING-STATUS',
    GET_USER_FOLLOW: 'USERS/GET-USER-FOLLOW',
    GET_USER_UNFOLLOW: 'USERS/GET-USER-UNFOLLOW',
}

export const followActionCreators = {
    getUserFollowingStatus: payload => ({ type: followActions.GET_USER_FOLLOWING_STATUS, payload }),
    getUserFollow: payload => ({ type: followActions.GET_USER_FOLLOW, payload }),
    getUserUnfollow: payload => ({ type: followActions.GET_USER_UNFOLLOW, payload })
}



//@ Get user following status

export function* getUserFollowingStatus(payload) {
    if (payload.isAuth) {
        try {
            const response = yield call(followAPI.checkFollow, payload.ID);
    
            yield put(setUserFollowingStatus(response));
        }
        catch(error) {
            yield put(setAppErrorStatus());
            console.error(error.message);
        }
    }
}

//@ Get user follow

export function* getUserFollow({ _, payload }) {
    yield put(setUserFollowFetchingStatus(payload));

    try {
        const response = yield call(followAPI.getFollow, payload);
        if (response.resultCode === 0) yield put(setUserFollowingStatus(true));
    }
    catch(error) {
        console.error(error.message);
    }
    finally {
        yield put(setUserFollowFetchingStatus(payload));
    }
}

//@ Get user unfollow

export function* getUserUnfollow({ _, payload }) {
    yield put(setUserFollowFetchingStatus(payload));

    try {
        const response = yield call(followAPI.getUnfollow, payload);
        if (response.resultCode === 0) yield put(setUserFollowingStatus(false));
    }
    catch(error) {
        console.error(error.message);
    }
    finally {
        yield put(setUserFollowFetchingStatus(payload));
    }
}

export default function* followRootSaga() {
    yield takeEvery(followActions.GET_USER_FOLLOWING_STATUS, getUserFollowingStatus);
    yield takeEvery(followActions.GET_USER_FOLLOW, getUserFollow);
    yield takeEvery(followActions.GET_USER_UNFOLLOW, getUserUnfollow);
}