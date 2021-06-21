import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import {
    setSidebarStatus
} from '../../store/appSlice';

import Icon from '../Icon';

import { ReactComponent as User } from '../../assets/icons/user.svg';
import { ReactComponent as Chat } from '../../assets/icons/chat.svg';
import { ReactComponent as Search } from '../../assets/icons/search.svg';



const Wrapper = styled.ul`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const MenuLink = styled(NavLink)`
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    width: 100%;
    border-radius: ${({theme}) => theme.radius};
    padding: 15px 25px;
        
    &.active {
        background: ${({theme}) => theme.blue};
        color: ${({theme}) => theme.darkBlue};

        svg {
            fill: ${({theme}) => theme.darkBlue}; 
        }
    }

    ${({theme}) => theme.breakpoints.touch} {
        font-size: 16px;
        padding: 12.5px 20px;
    }
`;

const MenuIcon = styled(Icon)`
    margin: 0 15px 0 0;

    ${({theme}) => theme.breakpoints.touch} {
        width: 18px;
        height: 18px;
    }
`;



const SidebarMenu = ({ isSidebarOpen }) => {
    const dispatch = useDispatch();

    const sidebarHandler = () => isSidebarOpen && dispatch(setSidebarStatus());



    return (
        <Wrapper>
            <li>
                <MenuLink exact to="/profile" activeClassName="active" onClick={sidebarHandler}>
                    <MenuIcon as={User} />
                    <span>Profile</span>
                </MenuLink>
            </li>
            <li>
                <MenuLink to="/chat" activeClassName="active" onClick={sidebarHandler}>
                    <MenuIcon as={Chat} />
                    <span>Chat</span>
                </MenuLink>
            </li>
            <li>
                <MenuLink to="/search" activeClassName="active" onClick={sidebarHandler}>
                    <MenuIcon as={Search} />
                    <span>Search</span>
                </MenuLink>
            </li>
        </Wrapper>
    )
}



export default SidebarMenu;