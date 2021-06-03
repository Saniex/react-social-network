import { configureStore } from '@reduxjs/toolkit';

import appSlice from './appSlice';
import authSlice from './authSlice';
import usersSlice from './usersSlice';



export default configureStore({
    reducer: {
        app: appSlice,
        auth: authSlice,
        users: usersSlice
    }
});