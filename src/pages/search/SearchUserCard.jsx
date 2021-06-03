import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import avatar from '../../assets/img/avatar.jpg';



const Wrapper = styled(NavLink)`
    display: flex;
    align-items: center;
    padding: 25px 0;

    ${({theme}) => theme.breakpoints.tablet} {
        padding: 15px 0;
    } 
`;

const Name = styled.span`
    font-size: 18px;
    font-weight: 400;

    ${({theme}) => theme.breakpoints.tablet} {
        font-size: 16px;
    }
`;

const Avatar = styled.div`
    flex: 0 0 50px;
    margin: 0 25px 0 0;

    img {
        max-width: 100%;
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    ${({theme}) => theme.breakpoints.tablet} {
        flex: 0 0 45px;
        margin: 0 15px 0 0;
        
        img {
            width: 45px;
            height: 45px;
        }
    }
`;



const UserCard = props => {

    const {
        id,
        name,
        photos
    } = props.user;



    return (
        <Wrapper to={`/profile/${id}`}>
            <Avatar>
                <img src={photos?.small || avatar} alt="avatar" />
            </Avatar>
            <Name>
                {name}
            </Name>
        </Wrapper>
    )
}



export default UserCard;