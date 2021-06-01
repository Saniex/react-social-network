import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

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



const SidebarMenu = props => {
    return (
        <Wrapper>
            <li>
                <MenuLink exact to="/profile" activeClassName="active">
                    <MenuIcon as={User} />
                    <span>Profile</span>
                </MenuLink>
            </li>
            <li>
                <MenuLink to="/chat" activeClassName="active">
                    <MenuIcon as={Chat} />
                    <span>Chat</span>
                </MenuLink>
            </li>
            <li>
                <MenuLink to="/search" activeClassName="active">
                    <MenuIcon as={Search} />
                    <span>Search</span>
                </MenuLink>
            </li>
        </Wrapper>
    )
}



export default SidebarMenu;