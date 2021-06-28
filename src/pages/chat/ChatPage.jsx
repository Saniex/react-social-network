import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { 
    selectAuthStatus,
} from '../../store/authSlice';

import { 
    createChatWebSocket, selectChatInitStatus 
} from '../../store/chatSlice';

import Preloader from '../../components/Preloader';

import MessageField from './ChatMessageField';
import MessagesList from './ChatMessagesList';



const ChatPage = props => {
    const dispatch = useDispatch();
    
    const isChatInit = useSelector(selectChatInitStatus);
    const isAuth = useSelector(selectAuthStatus);



    useEffect(() => {
        if (!isChatInit) dispatch(createChatWebSocket());
    }, [])



    if (!isAuth) return <Redirect to="/login" />

    if (!isChatInit) return <Preloader />

    return (
        <>
            <MessagesList />
            <MessageField />
        </>
    )
}



export default ChatPage;