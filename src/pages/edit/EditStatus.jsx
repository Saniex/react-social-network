import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import * as yup from 'yup';

import { putUserStatus } from '../../store/profileSlice';

import Input from '../../components/Input';
import Button from '../../components/Button';



const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const ErrorMessage = styled.p`
    font-family: ${({theme}) => theme.secondaryFont};
    color: ${({theme}) => theme.darkRed};
    margin: 15px 0 0 0;

    ${({theme}) => theme.breakpoints.tablet} {
        font-size: 14px;
    }
`;

const EditButton = styled(Button)`
    max-width: 150px;
    margin: 25px 0 0 0;

    ${({theme}) => theme.breakpoints.tablet} {
        margin: 15px 0 0 0;
    }
`;



const schema = yup
    .string()
    .max(300, 'Status must be at most 300 characters');



const Status = props => {

    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = useState('');



    const { register, handleSubmit } = useForm();



    const handleStatusForm = ({ statusText }) => {
        schema.validate(statusText)
            .then(() => {
                dispatch(putUserStatus(statusText));
                errorMessage && setErrorMessage('');
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    }



    return (
        <Form onSubmit={handleSubmit(handleStatusForm)}>
            <Input
                {...register('statusText')}
                placeholder="What's your mind?"
            />
            {
                errorMessage && 

                <ErrorMessage>
                    {errorMessage}
                </ErrorMessage>
            }
            <EditButton color="green">
                Submit
            </EditButton>
        </Form>
    )
}



export default Status;