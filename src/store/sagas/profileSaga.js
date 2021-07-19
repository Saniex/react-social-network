import { put, all, call, takeEvery, takeLeading } from '@redux-saga/core/effects';

import { setAppErrorStatus } from '../slices/appSlice';

import { 
    setProfileData,
    setProfileStatus,
    setProfileFetchingStatus,
    setProfileInitStatus
} from '../slices/profileSlice';

import { getUserFollowingStatus } from './followSaga';

import profileAPI from '../../api/profileAPI';



export const profileActions = {
    GET_USER_INFO: 'PROFILE/GET-USER-INFO',
    UPDATE_USER_INFO: 'PROFILE/UPDATE-USER-INFO',
    GET_USER_STATUS: 'PROFILE/GET-USER-STATUS',
    UPDATE_USER_STATUS: 'PROFILE/UPDATE-USER-STATUS',
    UPDATE_USER_PHOTO: 'PROFILE/UPDATE-USER-PHOTO',
    GET_USER_PROFILE: 'PROFILE/GET-USER-PROFILE'
}

export const profileActionCreators = {
    getUserInfo: payload => ({ type: profileActions.GET_USER_INFO, payload }),
    updateUserInfo: payload => ({ type: profileActions.UPDATE_USER_INFO, payload }),
    getUserStatus: payload => ({ type: profileActions.GET_USER_STATUS, payload }),
    updateUserStatus: payload => ({ type: profileActions.UPDATE_USER_STATUS, payload }),
    updateUserPhoto: payload => ({ type: profileActions.UPDATE_USER_PHOTO, payload }),
    getUserProfile: payload => ({ type: profileActions.GET_USER_PROFILE, payload })
}



//@ Get user info

export function* getUserInfo(payload) {
    yield put(setProfileFetchingStatus({ profile: true }));

    try {
        const response = yield call(profileAPI.getProfile, payload);

        yield put(setProfileData(response));
    }
    catch(error) {
        yield put(setAppErrorStatus());
        console.error(error.message);
    }
    finally {
        yield put(setProfileFetchingStatus({ profile: false }));
    }
}

//@ Update user info

export function* updateUserInfo({ _, payload }) {
    yield put(setProfileFetchingStatus({ profile: true }));

    try {
        const response = yield call(profileAPI.setProfile, payload);

        if (response.resultCode === 0) yield put(setProfileData(payload));
    }
    catch(error) {
        console.error(error.message);
    }
    finally {
        yield put(setProfileFetchingStatus({ profile: false }));
    }
}

//@ Get user status

export function* getUserStatus(payload) {
    yield put(setProfileFetchingStatus({ status: true }));

    try {
        const response = yield call(profileAPI.getStatus, payload);

        yield put(setProfileStatus(response));
    }
    catch(error) {
        yield put(setAppErrorStatus());
        console.error(error.message);
    }
    finally {
        yield put(setProfileFetchingStatus({ status: false }));
    }
}

//@ Update user status

export function* updateUserStatus({ _, payload }) {
    yield put(setProfileFetchingStatus({ status: true }));

    try {
        const response = yield call(profileAPI.setStatus, payload);
        
        if (response.resultCode === 0) yield put(setProfileStatus(payload));
        
    }
    catch(error) {
        console.error(error.message);
    }
    finally {
        yield put(setProfileFetchingStatus({ status: false }));
    }
}

export function* updateUserPhoto({ _, payload }) {
    yield put(setProfileFetchingStatus({ photo: true }));

    try {
        const response = yield call(profileAPI.setPhoto, payload);
    }
    catch(error) {
        console.error(error.message);
    }
    finally {
        yield put(setProfileFetchingStatus({ photo: false }));
    }
}

//@ Get user profile

export function* getUserProfile({ _, payload }) {
    try {
        yield all([
            call(getUserInfo, payload),
            call(getUserStatus, payload),
            call(getUserFollowingStatus, payload)
        ]);

        yield put(setProfileInitStatus());
    }
    catch(error) {
        put(setAppErrorStatus());
        console.error(error.message);
    }
}

export default function* profileRootSafa() {
    yield takeEvery(profileActions.GET_USER_INFO, getUserInfo);
    yield takeEvery(profileActions.UPDATE_USER_INFO, updateUserInfo);
    yield takeEvery(profileActions.GET_USER_STATUS, getUserStatus);
    yield takeEvery(profileActions.UPDATE_USER_STATUS, updateUserStatus);
    yield takeEvery(profileActions.UPDATE_USER_PHOTO, updateUserPhoto);
    yield takeLeading(profileActions.GET_USER_PROFILE, getUserProfile);
}