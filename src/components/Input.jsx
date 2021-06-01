import { forwardRef } from 'react';
import styled from 'styled-components';



const StyledInput = styled.input`
    width: 100%;
    height: 50px;
    background: ${({theme}) => theme.lightBackground};
    border: 1px solid ${({theme}) => theme.border};
    border-radius: ${({theme}) => theme.radius};
    font-size: 16px;
    color: ${({theme}) => theme.lightText};
    padding: 0 25px;
    transition: all .3s ease;

    &:hover,
    &:focus {
        background: ${({theme}) => theme.lightBackground};
    }

    &:-ms-input-placeholder {
        color: ${({theme}) => theme.lightText};
    }

    &::-webkit-input-placeholder {
        color: ${({theme}) => theme.lightText};
    };

    &::-moz-placeholder {
        color: ${({theme}) => theme.lightText};
    }

    &:-moz-placeholder {
        color: ${({theme}) => theme.lightText};
    }

    &:-webkit-autofill {
        box-shadow: inset 0 0 0 50px ${({theme}) => theme.lightBackground};;
        -webkit-text-fill-color: ${({theme}) => theme.lightText};
        color: ${({theme}) => theme.lightText}; 
    }

    ${({theme}) => theme.breakpoints.tablet} {
        padding: 0 15px;
    }
`;


const Input = forwardRef((props, ref) => {
    return (
        <StyledInput ref={ref} {...props} />
    )
});


export default Input;