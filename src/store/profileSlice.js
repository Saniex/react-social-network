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

export const putUserInfo = createAsyncThunk(
    'profile/putUserInfo',
    async profileInfo => {
        try {
            const profileData = await profileAPI.setProfile(profileInfo);

            return profileData;
        }
        catch(error) {
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

export const putUserStatus = createAsyncThunk(
    'profile/putUserStatus',
    async status => {
        try {
            const statusData = await profileAPI.setStatus(status);
    
            return statusData;
        }
        catch(error) {
            throw new Error(error);
        }
    }
);

export const putProfilePhoto = createAsyncThunk(
    'profile/putProfilePhoto',
    async photo => {
        try {
            const photoData = await profileAPI.setPhoto(photo);
    
            return photoData;
        }
        catch(error) {
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
        profileStatus: '',
        isFetching: {
            profile: false,
            status: false,
            photo: false
        },
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
        [getUserInfo.rejected]: (state, { error }) => {
            console.error(error.message);
        },

        // Put user profile

        [putUserInfo.pending]: state => {
            state.isFetching.profile = true;
        },
        [putUserInfo.fulfilled]: state => {
            state.isFetching.profile = false;
        },
        [putUserInfo.rejected]: (state, { error }) => {
            state.isFetching.profile = false;
            console.error(error.message);
        },

        // Get user status

        [getUserStatus.fulfilled]: (state, { payload }) => {
            state.profileStatus = payload;
        },
        [getUserStatus.rejected]: (_, { error }) => {
            console.error(error.message);
        },

        // Put user status

        [putUserStatus.pending]: state => {
            state.isFetching.status = true;
        },
        [putUserStatus.fulfilled]: state => {
            state.isFetching.status = false;
        },
        [putUserStatus.rejected]: (state, { error }) => {
            state.isFetching.status = false;
            console.error(error.message);
        },

        // Get user profile data

        [getUserProfileData.pending]: state => {
            state.isFetching.profile = true;
        },
        [getUserProfileData.fulfilled]: state => {
            state.isFetching.profile = false;
            state.isInit = true;
        },
        [getUserProfileData.rejected]: (state, { error }) => {
            state.isFetching.profile = false;
            console.error(error.message);
        },

        // Put profile photo

        [putProfilePhoto.pending]: state => {
            state.isFetching.photo = true;
        },
        [putProfilePhoto.fulfilled]: state => {
            state.isFetching.photo = false;
        },
        [putProfilePhoto.rejected]: (state, { error }) => {
            state.isFetching.photo = false;
            console.error(error.message);
        }
    }
});



export const selectProfileData = state => state.profile.profileData;
export const selectProfileStatus = state => state.profile.profileStatus;
export const selectProfileFetchingStatus = state => state.profile.isFetching;
export const selectProfileInitStatus = state => state.profile.isInit;



export const { clearProfileData } = profileSlice.actions; 

export default profileSlice.reducer;