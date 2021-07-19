import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { setAppErrorStatus } from './appSlice';



let socket;

export const createChatWebSocket = createAsyncThunk(
    'chat/initChat',
    async (_, { dispatch }) => {
        socket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

        socket.onopen = e => e.currentTarget.readyState === 1 && dispatch(initChat());

        socket.onmessage = e => {
            const newMessages = JSON.parse(e.data);
            dispatch(setMessages(newMessages));
        }

        socket.onerror = () => dispatch(setAppErrorStatus(true)); 
    }
);



const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        isInit: false,
        messages: []
    },
    reducers: {
        initChat: state => {
            state.isInit = true;
        },
        setMessages: (state, { payload }) => {
            state.messages = [...state.messages, ...payload];
        },
        sendMessage: (_, { payload }) => {
            socket.send(payload);
        }
    }
});



export const selectChatMessages = state => state.chat.messages;
export const selectChatInitStatus = state => state.chat.isInit;



export const { 
    initChat,
    setMessages,
    sendMessage
} = chatSlice.actions;

export default chatSlice.reducer;