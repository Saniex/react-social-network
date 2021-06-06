import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { setErrorStatus } from './appSlice';
import { checkFollowStatus } from './followSlice';

import profileAPI from '../api/profileAPI';



export const getUserInfo = createAsyncThunk(
    'profile/getUserInfo',
    async (ID, { dispatch }) => {
        try {
            const profileData = await profileAPI.getProfile(ID);
    
            return profileData;
        }
        catch(error) {
            dispatch(setErrorStatus(null));
            throw new Error(error);
        }
    }
);

export const getUserStatus = createAsyncThunk(
    'profile/getUserStatus',
    async (ID, { dispatch }) => {
        try {
            const statusData = await profileAPI.getStatus(ID);
    
            return statusData;
        }
        catch(error) {
            dispatch(setErrorStatus(null));
            throw new Error(error);
        }
    }
);

export const getUserProfileData = createAsyncThunk(
    'profile/getUserProfileData',
    async (ID, { dispatch }) => {
        await Promise.all([
            dispatch(getUserInfo(ID)),
            dispatch(getUserStatus(ID)),
            dispatch(checkFollowStatus(ID))
        ]);
    }
);



const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profileData: {},
        profileStatus: null,
        isFetching: false,
        isInit: false
    },
    reducers: {
        clearProfileData: state => {
            state.profileData = {};
            state.profileStatus = null;
            state.isInit = false;
        }
    },
    extraReducers: {

        // Get user profile

        [getUserInfo.fulfilled]: (state, { payload }) => {
            state.profileData = payload;
        },
        [getUserInfo.rejected]: (_, { error }) => {
            console.error(error.message);
        },

        // Get user status

        [getUserStatus.fulfilled]: (state, { payload }) => {
            state.profileStatus = payload;
        },
        [getUserStatus.rejected]: (_, { error }) => {
            console.error(error.message);
        },

        // getUserProfileData

        [getUserProfileData.pending]: state => {
            state.isFetching = true;
        },
        [getUserProfileData.fulfilled]: state => {
            state.isFetching = false;
            state.isInit = true;
        },
        [getUserProfileData.rejected]: (state, { error }) => {
            state.isFetching = false;
            console.error(error.message);
        },
        
    }
});



export const selectProfileData = state => state.profile.profileData;
export const selectProfileStatus = state => state.profile.profileStatus;
export const selectProfileFetchingStatus = state => state.profile.isFetching;
export const selectProfileInitStatus = state => state.profile.isInit;



export const { clearProfileData } = profileSlice.actions; 

export default profileSlice.reducer;