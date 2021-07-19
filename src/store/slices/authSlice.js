import { createSlice } from "@reduxjs/toolkit";



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
        setAuthStatus: (state, { payload }) => {
            state.isAuth = payload;
        },
        setCurrentUserData: (state, { payload }) => {
            state.currentUserData = payload || {};
        },
        setAuthFetchingStatus: ( state, { payload }) => {
            state.isFetching = payload;
        },
        setAuthErrorMessage: (state, { payload }) => {
            state.authErrorMessage = payload || null;
        }
    },
});



export const selectCurrentUserData = state => state.auth.currentUserData;
export const selectAuthStatus = state => state.auth.isAuth;
export const selectAuthFetchingStatus = state => state.auth.isFetching;
export const selectAuthErrorMessage = state => state.auth.authErrorMessage;



export const {
    setAuthStatus,
    setCurrentUserData,
    setAuthFetchingStatus,
    setAuthErrorMessage 
} = authSlice.actions;

export default authSlice.reducer;