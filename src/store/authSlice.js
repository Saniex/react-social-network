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

export const getLogIn = createAsyncThunk(
    'auth/getLogIn',
    async (accountData, { dispatch }) => {
        try {
            const logInData = await authAPI.logIn(accountData);
            if (logInData.resultCode === 0) dispatch(getAuthStatus());

            return logInData;
        }
        catch(error) {
            setTimeout(() => dispatch(getLogIn(accountData)), 1000);
        }
    }
);

export const getLogOut = createAsyncThunk(
    'auth/getLogOut',
    async (_, { dispatch }) => {
        try {
            const logOutData = await authAPI.logOut();
            if (logOutData.resultCode === 0) dispatch(getAuthStatus());

            return logOutData;
        }
        catch(error) {
            setTimeout(() => dispatch(getLogOut()), 1000);
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
        authErrorMessage: null
    },
    reducers: {
        deleteAuthErrorMessage: state => {
            state.authErrorMessage = null;
        }
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

        //@ Get log in

        [getLogIn.pending]: state => {
            state.isFetching = true;
        },
        [getLogIn.fulfilled]: ( state, { payload } ) => {
            switch(payload.resultCode) {
                case 0:
                    break;
                
                case 1:
                    state.authErrorMessage = 'You entered an incorrect username or password';
                    break;
                
                case 10:
                    state.authErrorMessage = 'You entered an incorrect Capcha';
                    break;

                default: break;
            }
            if (payload.resultCode !== 0) state.isFetching = false;
        },
        [getLogIn.rejected]: state => {
            state.isFetching = false;
        },

        //@ Get log out

        [getLogOut.pending]: state => {
            state.isFetching = true;
        },
        [getLogOut.fulfilled]: ( state, { payload } ) => {
            if (payload.resultCode !== 0) state.isFetching = false;
        },
        [getLogOut.rejected]: state => {
            state.isFetching = false;
        },
    }
});



export const selectCurrentUserData = state => state.auth.currentUserData;
export const selectAuthStatus = state => state.auth.isAuth;
export const selectAuthFetchingStatus = state => state.auth.isFetching;
export const selectAuthErrorMessage = state => state.auth.authErrorMessage;



export const { deleteAuthErrorMessage } = authSlice.actions;
export default authSlice.reducer;