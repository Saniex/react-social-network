import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { setErrorStatus } from './appSlice';

import followAPI from '../api/followAPI';



export const checkFollowStatus = createAsyncThunk(
    'follow/checkFollowStatus',
    async ID => {
        try {
            const followData = await followAPI.checkFollow(ID);

            return followData;
        }
        catch(error) {
            throw new Error(error);
        }
    }
)

export const getUserFollow = createAsyncThunk(
    'follow/getUserFollow',
    async ID => {
        try {
            const followData = await followAPI.getFollow(ID);

            return followData;
        }
        catch(error) {
            throw new Error(error);
        }
    }
);

export const getUserUnfollow = createAsyncThunk(
    'follow/getUserUnfollow',
    async ID => {
        try {
            const unfollowData = await followAPI.getUnfollow(ID);

            return unfollowData;
        }
        catch(error) {
            throw new Error(error);
        }
    }
);



const deleteUserID = (state, userID) => state.isFetching.filter(ID => ID !== userID)



const followSlice = createSlice({
    name: 'follow',
    initialState: {
        isFollow: false,
        isFetching: []
    },
    extraReducers: {

        // Check follow status

        [checkFollowStatus.fulfilled]: (state, { payload }) => {
            state.isFollow = payload;
        },
        [checkFollowStatus.rejected]: (_, { error }) => {
            console.error(error.message);
        },

        // Get user follow

        [getUserFollow.pending]: (state, { meta }) => {
            state.isFetching.push(meta.arg);
        },
        [getUserFollow.fulfilled]: (state, { meta }) => {
            state.isFollow = true;
            state.isFetching = deleteUserID(state, meta.arg);
        },
        [getUserFollow.rejected]: (state, { meta, error }) => {
            state.isFetching = deleteUserID(state, meta.arg);
            console.error(error.message);
        },

        // Get user unfollow

        [getUserUnfollow.pending]: (state, { meta }) => {
            state.isFetching.push(meta.arg);
        },
        [getUserUnfollow.fulfilled]: (state, { meta }) => {
            state.isFollow = false;
            state.isFetching = deleteUserID(state, meta.arg);
        },
        [getUserUnfollow.rejected]: (state, { meta, error }) => {
            state.isFetching = deleteUserID(state, meta.arg);
            console.error(error.message);
        }
    }
});



export const selectFollowStatus = state => state.follow.isFollow;
export const selectFollowFetchingStatus = state => state.follow.isFetching;



export default followSlice.reducer;