import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getAuthStatus } from "./authSlice";



export const getAppInit = createAsyncThunk(
    'app/initApp',
    async (_, { dispatch }) => {
        await Promise.all([
            dispatch(getAuthStatus())
        ]);
    }
);



const appSlice = createSlice({
    name: 'app',
    initialState: {
        isInit: false,
        theme: localStorage.getItem('theme') || 'light',
        isSidebarOpen: false,
        isError: false,
        errorMessage: null
    },
    reducers: {
        setTheme: state => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
        setSidebarStatus: state => {
            state.isSidebarOpen = state.isSidebarOpen ? false : true;
        },
        setErrorStatus: (state, { payload }) => {
            state.isError = true;
            state.errorMessage = payload;
        }
    },
    extraReducers: {
        [getAppInit.fulfilled]: state => {
            state.isInit = true;
        },
        [getAppInit.rejected]: state => {
            state.isError = true;
        },
    }
});



export const selectAppInitStatus = state => state.app.isInit;
export const selectAppTheme = state => state.app.theme;
export const selectSidebarStatus = state => state.app.isSidebarOpen;
export const selectAppErrorStatus = state => state.app.isError;
export const selectAppErrorMessage = state => state.app.errorMessage;


export const { setTheme, setSidebarStatus, setErrorStatus } = appSlice.actions;
export default appSlice.reducer;
