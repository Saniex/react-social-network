import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { setErrorStatus } from './appSlice';

import usersAPI from '../api/usersAPI';



export const getUsersList = createAsyncThunk(
    'users/getUsersList',
    async ({ count, page, term, friend }, { dispatch }) => {
        try {
            const usersData = await usersAPI.getUsers(count, page, term, friend);

            return usersData;
        }
        catch(error) {
            dispatch(setErrorStatus(null));
            throw new Error(error);
        }
    }
);



const usersSlice = createSlice({
    name: 'users',
    initialState: {
        usersList: [],
        totalCount: 0,
        isFetching: false,
        isInit: false
    },
    reducers: {
        cleanUsersList: state => {
            state.usersList = [];
            state.isInit = false;
        }
    },
    extraReducers: {

        // Get users list

        [getUsersList.pending]: state => {
            state.isFetching = true;
        },
        [getUsersList.fulfilled]: (state, { payload }) => {
            state.usersList = [...state.usersList, ...payload.items];
            state.totalCount = payload.totalCount;
            state.isFetching = false;
            state.isInit = true;
        },
        [getUsersList.rejected]: (state, { error }) => {
            state.isFetching = false;
            console.error(error.message);
        },
    }
});



export const selectUsersList = state => state.users.usersList;
export const selectUsersFetchingStatus = state => state.users.isFetching;
export const selectUsersInitStatus = state => state.users.isInit;
export const selectUsersTotalCount = state => state.users.totalCount;



export const { cleanUsersList } = usersSlice.actions;
export default usersSlice.reducer;