import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';

import appSlice from './slices/appSlice';
import authSlice from './slices/authSlice';
import followSlice from './slices/followSlice';
import profileSlice from './slices/profileSlice';
import usersSlice from './slices/usersSlice';
import chatSlice from './slices/chatSlice';

import rootSaga from './sagas/rootSaga';



const sagaMiddleware = createSagaMiddleware();

export default configureStore({
    reducer: {
        app: appSlice,
        auth: authSlice,
        profile: profileSlice,
        users: usersSlice,
        follow: followSlice,
        chat: chatSlice
    },
    middleware: [...getDefaultMiddleware(), sagaMiddleware]
});

sagaMiddleware.run(rootSaga);