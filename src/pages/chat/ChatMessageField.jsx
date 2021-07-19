import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';



const Wrapper = styled.form`
    display: flex;
`;

const ChatInput = styled(Input)`
    border-right: none;
    border-radius: ${({theme}) => `${theme.radius} 0 0 ${theme.radius}`};
`;

const ChatButton = styled(Button)`
    flex: 0 0 150px;
    border-radius: ${({theme}) => `0 ${theme.radius} ${theme.radius} 0`};
    font-size: 18px;

    ${({theme}) => theme.breakpoints.tablet} {
        flex: 0 0 90px;
        font-size: 16px;
    }
`;



const schema = yup
    .string()
    .max(300, 'Message must be at most 100 characters');



const MessageField = props => {
    const dispatch = useDispatch();

    const messageForm = useRef();



    // Form handler
    
    const { register, handleSubmit } = useForm();

    const messageFormHandler = ({ messageText }) => {
        schema.validate(messageText)
            .then(() => {
                messageForm.current.reset();
            });
    }



    return (
        <Wrapper 
            ref={messageForm}
            onSubmit={handleSubmit(messageFormHandler)}>
            <ChatInput
                {...register('messageText')}
                maxLength="100"
                placeholder="Enter your message" 
            />
            <ChatButton outlined>
                Send
            </ChatButton>
        </Wrapper>
    )
}



export default MessageField;