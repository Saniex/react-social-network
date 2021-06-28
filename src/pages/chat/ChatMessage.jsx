import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import avatar from '../../assets/img/avatar.jpg';



const Wrapper = styled.div`
    align-self: ${({isCurrentUserMessage}) => isCurrentUserMessage ? 'flex-end' : 'flex-start'};
    display: flex;
    flex-direction: ${({isCurrentUserMessage}) => isCurrentUserMessage ? 'row-reverse' : 'row'};
    align-items: center;
    max-width: 90%;
    line-height: 1.4;
    text-align: ${({isCurrentUserMessage}) => isCurrentUserMessage ? 'right' : 'left'};
    color: ${({theme}) => theme.mainText};
    margin: 0 0 15px 0;

    ${({theme}) => theme.breakpoints.tablet} {
        font-size: 14px;
        margin: 0 0 5px 0;
    }
`;

const Avatar = styled.div`
    flex: 0 0 35px;
    margin: ${({isCurrentUserMessage}) => isCurrentUserMessage ? '0 0 0 15px' : '0 15px 0 0'};

    img {
        max-width: 100%:
        width: 35px;
        height: 35px;
        border-radius: 50%;
    }

    ${({theme}) => theme.breakpoints.tablet} {
        flex: 0 0 30px;
        margin: ${({isCurrentUserMessage}) => isCurrentUserMessage ? '0 0 0 10px' : '0 10px 0 0'};

        img {
            width: 30px;
            height: 30px;
        }
    }
`;



const Message = props => {
    const { 
        photo, 
        message, 
        ID 
    } = props;



    return (
        <Wrapper {...props}>
            <NavLink to={`/profile/${ID}`}>
                <Avatar {...props}>
                    <img src={photo || avatar} alt="avatar" />
                </Avatar>
            </NavLink>
            <span>
                {message}
            </span>
        </Wrapper>
    )
}



export default Message;