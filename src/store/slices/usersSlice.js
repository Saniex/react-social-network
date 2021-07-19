import { createSlice } from '@reduxjs/toolkit';



const usersSlice = createSlice({
    name: 'users',
    initialState: {
        usersList: [],
        totalCount: 0,
        isFetching: false,
        isInit: false
    },
    reducers: {
        setUsersList: (state, { payload }) => {
            state.usersList = [...state.usersList, ...payload.items];
            state.totalCount = payload.totalCount;
        },
        cleanUsersList: state => {
            state.usersList = [];
            state.isInit = false;
        },
        setUsersInitStatus: state => {
            state.isInit = true;
        },
        setUsersFetchingStatus: (state, { payload }) => {
            state.isFetching = payload;
        }
    }
});



export const selectUsersList = state => state.users.usersList;
export const selectUsersFetchingStatus = state => state.users.isFetching;
export const selectUsersInitStatus = state => state.users.isInit;
export const selectUsersTotalCount = state => state.users.totalCount;



export const { 
    setUsersList, 
    cleanUsersList,
    setUsersFetchingStatus,
    setUsersInitStatus
} = usersSlice.actions;

export default usersSlice.reducer;