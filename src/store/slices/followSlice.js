import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import followAPI from '../../api/followAPI';



const deleteUserID = (state, userID) => state.isFetching.filter(ID => ID !== userID)



const followSlice = createSlice({
    name: 'follow',
    initialState: {
        isFollow: false,
        isFetching: []
    },
    reducers: {
        setUserFollowingStatus: (state, { payload }) => {
            state.isFollow = payload;
        },
        setUserFollowFetchingStatus: (state, { payload }) => {
            state.isFetching.some(ID => ID === payload) ?
            state.isFetching = deleteUserID(state, payload) :
            state.isFetching.push(payload);
        }
    }
});



export const selectFollowStatus = state => state.follow.isFollow;
export const selectFollowFetchingStatus = state => state.follow.isFetching;



export const { 
    setUserFollowingStatus, 
    setUserFollowFetchingStatus 
} = followSlice.actions;

export default followSlice.reducer;