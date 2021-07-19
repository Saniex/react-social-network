import { createSlice } from '@reduxjs/toolkit';



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
        setProfileData: (state, { payload }) => {
            state.profileData = payload;
        },
        setProfileStatus: (state, { payload }) => {
            state.profileStatus = payload;
        },
        clearProfileData: state => {
            state.profileData = {};
            state.profileStatus = null;
            state.isInit = false;
        },
        setProfileFetchingStatus: (state, { payload }) => {
            state.isFetching = { ...state.isFetching, ...payload };
        },
        setProfileInitStatus: state => {
            state.isInit = true;
        }
    }
});



export const selectProfileData = state => state.profile.profileData;
export const selectProfileStatus = state => state.profile.profileStatus;
export const selectProfileFetchingStatus = state => state.profile.isFetching;
export const selectProfileInitStatus = state => state.profile.isInit;



export const { 
    setProfileData,
    setProfileStatus,
    clearProfileData,
    setProfileFetchingStatus,
    setProfileInitStatus
} = profileSlice.actions; 

export default profileSlice.reducer;