import { createSlice } from "@reduxjs/toolkit";



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
        setAppInitStatus: state => {
            state.isInit = true;
        },
        setTheme: state => {
            const currentTheme = state.theme === 'light' ? 'dark' : 'light';
            state.theme = currentTheme;
            localStorage.setItem('theme', currentTheme);
        },
        setSidebarStatus: state => {
            state.isSidebarOpen = state.isSidebarOpen ? false : true;
        },
        setAppErrorStatus: (state) => {
            state.isError = true;
        }
    }
});



export const selectAppInitStatus = state => state.app.isInit;
export const selectAppTheme = state => state.app.theme;
export const selectSidebarStatus = state => state.app.isSidebarOpen;
export const selectAppErrorStatus = state => state.app.isError;
export const selectAppErrorMessage = state => state.app.errorMessage;


export const { 
    setAppInitStatus, 
    setTheme, 
    setSidebarStatus, 
    setAppErrorStatus 
} = appSlice.actions;

export default appSlice.reducer;
