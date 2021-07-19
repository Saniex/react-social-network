import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import {
    selectSidebarStatus
} from '../../store/slices/appSlice';

import SidebarMenu from './SidebarMenu';
import ThemeToggler from './SidebarThemeToggler';



const Wrapper = styled.div`
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 100vh;
    background: ${({theme}) => theme.mainBackground};
    border-right: 1px solid ${({theme}) => theme.border};
    padding: 90px 25px 25px 25px;
    transform: translateX(-150%);
    transition: transform .3s ease;
    overflow-y: auto;
    overflow-x: hidden;

    ${({isSidebarOpen}) => isSidebarOpen && css`
        transform: translateX(0);
    `};
    
    ${({theme}) => theme.breakpoints.desktop} {
        transform: translateX(0);
    }

    ${({theme}) => theme.breakpoints.tablet} {
        padding: 90px 15px 15px 15px;
        width: 250px;
    }

    ${({theme}) => theme.breakpoints.mobile} {
        width: 100%;
        padding: 80px 15px 15px 15px;
    }
`;

const Section = styled.div`
    border-bottom: 1px solid ${({theme}) => theme.border};
    padding: 0 0 25px 0;
    margin: 0 0 25px 0;

    &:last-child {
        border: none;
    }

    ${({theme}) => theme.breakpoints.touch} {
        padding: 0 0 15px 0;
        margin: 0 0 15px 0;
    }
`;



const Sidebar = props => {
    const isSidebarOpen = useSelector(selectSidebarStatus);



    return (
        <Wrapper isSidebarOpen={isSidebarOpen}>
            <Section>
                <SidebarMenu isSidebarOpen={isSidebarOpen} />
            </Section>
            <Section>
                <ThemeToggler />
            </Section>
        </Wrapper>
    )
}



export default Sidebar;