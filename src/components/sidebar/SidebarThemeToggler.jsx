import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import { 
    selectAppTheme, 
    setTheme 
} from '../../store/appSlice';



const Wrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0 25px;

    ${({theme}) => theme.breakpoints.touch} {
        padding: 0 15px;
    }
`;

const Toggler = styled.div`
    position: relative;
    width: 30px;
    height: 14px;
    background: ${({theme}) => theme.border};
    border: 1px solid ${({theme}) => theme.border};
    border-radius: 20px;
    margin: 0 15px 0 0;
    cursor: pointer;

    &:before {
        content: '';
        position: absolute;
        top: -25%;
        left: ${({appTheme}) => appTheme === 'light' ? '-5px' : '15px'};
        display: inline-block;
        width: 18px;
        height: 18px;
        background: ${({theme}) => theme.lightBackground};
        border: 1px solid ${({theme}) => theme.border};
        border-radius: 50%;
        transition: left .3s ease;
    }
`;


const ThemeToggler = props => {
    const dispatch = useDispatch();

    const appTheme = useSelector(selectAppTheme);


    // Handlers

    const togglerHandler = () => dispatch(setTheme())



    return (
        <Wrapper>
            <Toggler appTheme={appTheme} onClick={togglerHandler} />
            <span>
                {appTheme === 'light' ? 'Light Theme' : 'Dark Theme'}
            </span>
        </Wrapper>
    )
}



export default ThemeToggler;