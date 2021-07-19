import { call, put, takeLeading } from '@redux-saga/core/effects';

import {
    setAppErrorStatus
} from '../slices/appSlice';

import {
    setUsersList,
    setUsersFetchingStatus,
    setUsersInitStatus
} from '../slices/usersSlice'

import usersAPI from '../../api/usersAPI';



export const usersActions = {
    GET_USERS_LIST: 'USERS/GET-USERS-LIST'
}

export const usersActionCreators = {
    getUsersList: payload => ({ type: usersActions.GET_USERS_LIST, payload })
}



export function* getUsersList({ _, payload }) {
    yield put(setUsersFetchingStatus(true));

    try {
        const response = yield call(usersAPI.getUsers, payload);

        yield put(setUsersList(response));
        yield put(setUsersInitStatus());
    }
    catch(error) {
        yield put(setAppErrorStatus());
        console.error(error.message);
    }
    finally {
        yield put(setUsersFetchingStatus(false));  
    }
}

export default function* usersRootSaga() {
    yield takeLeading(usersActions.GET_USERS_LIST, getUsersList);
}