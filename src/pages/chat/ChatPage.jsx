import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Preloader from '../../components/Preloader';

import MessageField from './ChatMessageField';
import MessagesList from './ChatMessagesList';



const ChatPage = props => {
    const dispatch = useDispatch();

    const isAuth = useSelector(selectAuthStatus);



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