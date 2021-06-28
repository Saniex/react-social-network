import { useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { 
    selectAuthStatus,
    selectCurrentUserData 
} from '../../store/authSlice';

import { 
    selectChatMessages 
} from '../../store/chatSlice';

import Message from './ChatMessage';



const Wrapper = styled.div`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    height: 100px;
    overflow-y: auto;
    margin: 0 0 25px 0;

    &::-webkit-scrollbar {
        width: 0;
    }

    ${({theme}) => theme.breakpoints.tablet} {
        margin: 0 0 15px 0;
    }
`;



const MessagesList = props => {
    const chatMessages = useSelector(selectChatMessages);
    const userData = useSelector(selectCurrentUserData);
    const isAuth = useSelector(selectAuthStatus);

    const list = useRef();



    useLayoutEffect(() => {
        if (isAuth) list.current.scrollTop =  list.current.scrollHeight;
    }, [chatMessages]);



    const makeMessages = messages => {
        return messages.map(({ userId, message, photo }, index) => (
            <Message
                key={index}
                ID={userId}
                message={message}
                photo={photo}
                isCurrentUserMessage={userData.id === userId}
            />
        ));
    }


    
    return (
        <Wrapper ref={list}>
            {makeMessages(chatMessages)}
        </Wrapper>
    )
}



export default MessagesList;