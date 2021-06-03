import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import * as yup from 'yup';

import {
    deleteAuthErrorMessage,
    getLogIn,
    selectAuthErrorMessage,
    selectAuthFetchingStatus,
    selectAuthStatus
} from '../../store/authSlice';

import Input from '../../components/Input';
import Checkbox from '../../components/Checkbox';



const Wrapper = styled.div`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 100px 0px 100px 0px;

    ${({theme}) => theme.breakpoints.tablet} {
        padding: 50px 0px 50px 0px;
    }
`;

const LoginForm = styled.form`
    max-width: 450px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${({theme}) => theme.lightBackground};
    border: 1px solid ${({theme}) => theme.border};
    border-radius: ${({theme}) => theme.radius};
    padding: 50px;

    ${({theme}) => theme.breakpoints.tablet} {
        max-width: 350px;
        padding: 40px 25px;
    }
`;

const Title = styled.h2`
    font-size: 26px;
    font-weight: 700;
    margin: 0 0 25px 0;
`;

const LoginInput = styled(Input)`
    height: 45px;
    margin: 0 0 10px 0;

    &:last-child {
        margin: 0 0 15px 0;
    }
`;

const CheckboxWrapper = styled.div`
    width: 100%;
    margin: 0 0 15px 0;
`;

const LoginButton = styled.button`
    width: 100%;
    min-height: 45px;
    background: ${({theme}) => theme.green};
    border-radius: ${({theme}) => theme.radius};
    font-family: ${({theme}) => theme.secondaryFont};
    font-size: 16px;
    font-weight: 700;
    color: ${({theme}) => theme.darkGreen};
    margin: 0 0 25px 0;

    ${({theme}) => theme.breakpoints.tablet} {
        min-height: 40px;
    }
`;

const Link = styled.a`

    &:hover {
        text-decoration: underline;
    }
`;

const ErrorMessage = styled.p`
    max-width: 80%;
    font-size: 14px;
    line-height: 1.2;
    color: ${({theme}) => theme.darkRed};
    margin: 25px 0 0 0;

    ${({theme}) => theme.breakpoints.tablet} {
        margin: 15px 0 0 0;
    }
`;



const loginFormSchema = yup.object().shape({
    email: yup
        .string('You entered an incorrect Email')
        .email('You entered an incorrect Email')
        .required('You did not enter your Email'),

    password: yup
        .string('You entered an incorrect password')
        .required('You did not enter your password'),
        
    rememberMe: yup
        .boolean()
});



const LoginPage = props => {

    const dispatch = useDispatch();

    const isAuth = useSelector(selectAuthStatus);
    const isAuthFetching = useSelector(selectAuthFetchingStatus);
    const authErrorMessage = useSelector(selectAuthErrorMessage);

    const [errorMessage, setErrorMessage] = useState(null);

    const loginForm = useRef();



    useEffect(() => {
        authErrorMessage && errorMessageHandler(authErrorMessage);
    }, [authErrorMessage]);



    const { register, handleSubmit } = useForm();



    const loginFormHandler = formData => {
        resetErrors();
        loginFormSchema.validate(formData)
            .then(() => dispatch(getLogIn(formData)))
            .catch(error => errorMessageHandler(error.message));
    };

    const errorMessageHandler = message => {
        setErrorMessage(message);
        setTimeout(resetErrors, 10000)
    }

    const resetErrors = () => {
        if (errorMessage) setErrorMessage(null);
        if (authErrorMessage) dispatch(deleteAuthErrorMessage());
    }



    if (isAuth) return <Redirect to="/profile" />

    return (
        <Wrapper>
            <LoginForm ref={loginForm} onChange={resetErrors} onSubmit={handleSubmit(loginFormHandler)}>
                <Title>
                    Sign In
                </Title>
                <div>
                    <LoginInput
                        {...register('email')}
                        type="text"
                        placeholder="Email" 
                    />
                    <LoginInput
                        {...register('password')}
                        type="password"
                        placeholder="Password" 
                    />
                </div>
                <CheckboxWrapper>
                    <Checkbox
                        {...register('rememberMe')}
                        id="login-remember-checkbox"
                        label="Remember me"
                    />
                </CheckboxWrapper>
                <LoginButton color="green" disabled={isAuthFetching}>
                    Get started
                </LoginButton>
                <Link
                    target="_blank"
                    href="https://social-network.samuraijs.com/signUp">
                    Don't have an account?
                </Link>
                {
                    errorMessage && (
                        <ErrorMessage>
                            {errorMessage}
                        </ErrorMessage>
                    )
                }
            </LoginForm>
        </Wrapper>
    )
}



export default LoginPage;