import { NavLink } from 'react-router-dom';
import styled from 'styled-components';



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
`;



const Header = props => {
    return (
        <Wrapper>
            <MainLogo to="/">
                Social Network
            </MainLogo>
        </Wrapper>
    )
}



export default Header;