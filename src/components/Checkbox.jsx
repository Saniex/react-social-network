import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectAppTheme } from '../store/appSlice';

import lightCheck from '../assets/icons/check-light.svg';
import darkCheck from '../assets/icons/check-dark.svg';



const Wrapper = styled.div`
    display: flex;
    align-items: center;
    background: ${({theme}) => theme.lightBackground};

    input:checked + label:before {
        background-image: ${({appTheme}) => appTheme === 'light' ? `url(${lightCheck})` : `url(${darkCheck})`};
        background-position: center;
        background-size: contain;
    }
`;

const StyledCheckbox = styled.input`
    display: none;
`;

const Label = styled.label`
    position: relative;
    font-size: 16px;
    color: ${({theme}) => theme.lightText};
    padding: 0 0 0 25px;
    cursor: pointer;

    &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid ${({theme}) => theme.border};
        border-radius: 2px;
    }

    ${({theme}) => theme.breakpoints.tablet} {
        font-size: 14px;

        &:before {
            width: 14px;
            height: 14px;
        }
    }   
`;



const Checkbox = forwardRef((props, ref) => {

    const { id, label } = props;

    const appTheme = useSelector(selectAppTheme);



    return (
        <Wrapper appTheme={appTheme}>
            <StyledCheckbox ref={ref} {...props} type="checkbox" />
            <Label htmlFor={id}>{label}</Label>
        </Wrapper>
    )
});



export default Checkbox;