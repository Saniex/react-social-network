import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { 
    selectSidebarStatus,
    setSidebarStatus 
} from '../../store/appSlice';

import {
    getLogOut,
    selectAuthFetchingStatus,
    selectAuthStatus 
} from '../../store/authSlice';

import Button from '../Button';
import Icon from '../Icon';

import { ReactComponent as Menu } from '../../assets/icons/menu.svg';
import { ReactComponent as SignIn } from '../../assets/icons/sign-in.svg';
import { ReactComponent as SignOut } from '../../assets/icons/sign-out.svg';



const Wrapper = styled.div`
    position: fixed;
    z-index: 200;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 65px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${({theme}) => theme.lightBackground};
    box-shadow: 0 3px 4px rgb(58 46 68 / 4%);
    padding: 10px 2.5%;

    ${({theme}) => theme.breakpoints.mobile} {
        min-height: 55px;
    }
`;

const MainLogo = styled(NavLink)`
    font-family: ${({theme}) => theme.secondaryFont};
    font-size: 26px;
    font-weight: 700;

    &,
    &:focus,
    &:active,
    &:visited {
        color: ${({theme}) => theme.mainColor};
    }

    -webkit-touch-callout: none; 
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    ${({theme}) => theme.breakpoints.mobile} {
        font-size: 24px;
    }
`;

const Actions = styled.div`
    display: flex;
    align-items: center;
`;

const ActionButton = styled(Button)`
`;

const MenuButton = styled(ActionButton)`
    padding: 10px;

    ${({theme}) => theme.breakpoints.desktop} {
        display: none;
    }
`;



const Header = props => {

    const dispatch = useDispatch();

    const isAuth = useSelector(selectAuthStatus);
    const isAuthFetching = useSelector(selectAuthFetchingStatus);
    const isSidebarOpen = useSelector(selectSidebarStatus);



    const menuButtonHandler = () => dispatch(setSidebarStatus());

    const handleLogOut = () => dispatch(getLogOut());

    const sidebarHandler = () => isSidebarOpen && dispatch(setSidebarStatus());



    return (
        <Wrapper>
            <MainLogo to="/">
                Social Network
            </MainLogo>
            <Actions>
                {
                    isAuth ?

                    <ActionButton color="red" onClick={handleLogOut} disabled={isAuthFetching}>
                        <Icon button="true" as={SignOut} />
                        <span>Sign Out</span>
                    </ActionButton> :

                    <NavLink to="/login" onClick={sidebarHandler}>
                        <ActionButton color="blue">
                            <Icon button="true" as={SignIn} />
                            <span>Sign In</span>
                        </ActionButton>
                    </NavLink>
                }
                <MenuButton>
                    <Icon as={Menu} onClick={menuButtonHandler} />
                </MenuButton> 
            </Actions>
        </Wrapper>
    )
}



export default Header;