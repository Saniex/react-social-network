import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authAPI from '../api/authAPI';

import { setErrorStatus } from './appSlice';



export const getAuthStatus = createAsyncThunk(
    'auth/getAuthStatus',
    async (_, { dispatch }) => {
        try {
            const authData = await authAPI.me();

            return authData;
        }
        catch(error) {
            dispatch(setErrorStatus(null));
            throw new Error(error);
        }
    }
);



const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUserData: {},
        currentUserStatus: null,
        currentUserProfile: {},
        isAuth: false,
        isFetching: false,
    },
    extraReducers: {

        //@ Get auth status

        [getAuthStatus.pending]: state => {
            state.isFetching = true;
        },
        [getAuthStatus.fulfilled]: (state, { payload }) => {
            switch(payload.resultCode) {
                case 0:
                    state.currentUserData = payload.data;
                    state.isAuth = true;
                    break;
                
                case 1:
                    state.currentUserData = {};
                    state.isAuth = false;
                    break;

                default: break;
            }
            state.isFetching = false;
        },
        [getAuthStatus.rejected]: (state, { error }) => {
            state.isFetching = false;
            console.error(error.message);
        },
    }
});



export const selectCurrentUserData = state => state.auth.currentUserData;
export const selectAuthStatus = state => state.auth.isAuth;
export const selectAuthFetchingStatus = state => state.auth.isFetching;



export const { deleteAuthErrorMessage } = authSlice.actions;
export default authSlice.reducer;