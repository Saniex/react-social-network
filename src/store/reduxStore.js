import { configureStore } from '@reduxjs/toolkit';

import appSlice from './appSlice';
import authSlice from './authSlice';



export default configureStore({
    reducer: {
        app: appSlice,
        auth: authSlice
    }
});