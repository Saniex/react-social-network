import { configureStore } from '@reduxjs/toolkit';

import appSlice from './appSlice';
import authSlice from './authSlice';
import followSlice from './followSlice';
import profileSlice from './profileSlice';
import usersSlice from './usersSlice';
import chatSlice from './chatSlice';



export default configureStore({
    reducer: {
        app: appSlice,
        auth: authSlice,
        profile: profileSlice,
        users: usersSlice,
        follow: followSlice,
        chat: chatSlice
    }
});