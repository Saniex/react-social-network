import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import checkLength from '../../utils/checkLength';

import {
    selectProfileData,
    selectProfileStatus
} from '../../store/profileSlice';

import { 
    selectFollowStatus 
} from '../../store/followSlice';

import Button from '../../components/Button';

import FollowButton from './ProfileFollowButton';
import ContactLink from './ProfileContactLink';

import { ReactComponent as VK } from '../../assets/icons/vk.svg';
import { ReactComponent as Facebook } from '../../assets/icons/facebook.svg';
import { ReactComponent as Instagram } from '../../assets/icons/instagram.svg';
import { ReactComponent as Twitter } from '../../assets/icons/twitter.svg';
import { ReactComponent as GitHub } from '../../assets/icons/github.svg';
import { ReactComponent as YouTube } from '../../assets/icons/youtube.svg';
import { ReactComponent as Link } from '../../assets/icons/link.svg';

import avatar from '../../assets/img/avatar.jpg';



const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${({ theme }) => theme.lightBackground};
    border: 1px solid ${({ theme }) => theme.border};
    box-shadow: 0 3px 4px rgb(58 46 68 / 4%);
    border-radius: 5px;
    margin: 0 0 25px 0;
    ${({theme}) => theme.breakpoints.tablet} {
        text-align: center;
        margin: 0 0 15px 0;
    }
`;

const Content = styled.div`
    display: flex;
    width: 100%;
    padding: 25px;
    ${({theme}) => theme.breakpoints.tablet} {
        flex-direction: column;
        align-items: center;
        padding: 15px;
    }
`;

const Avatar = styled.div`
    flex: 0 0 150px;
    margin: 0 25px 0 0;
    img {
        max-width: 100%;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: 4px solid ${({ theme }) => theme.border};
    }
    ${({theme}) => theme.breakpoints.tablet} {
        flex: 0 0 120px;
        margin: 0 0 25px 0;
        img {
            width: 120px;
            height: 120px;
        }
    }
`;

const Info = styled.div`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    ${({theme}) => theme.breakpoints.tablet} {
        width: 100%;
    }
`;

const Section = styled.div`
    display: flex;
    margin: 0 0 10px 0;
    &:last-child {
        margin: 0;
    }
    ${({theme}) => theme.breakpoints.tablet} {
        flex-direction: column;
        margin: 0 0 15px 0;
    }
`;

const Title = styled.h2`
    flex: 0 0 150px;
    margin: 0 15px 0 0;
    color: ${({theme}) => theme.lightText};
    ${({theme}) => theme.breakpoints.tablet} {
        flex: 1 1 auto;
        font-size: 14px;
        text-align: left;
        margin: 0 0 5px 0;
    }
`;

const Description = styled.p`
    flex: 1 1 auto;
    font-weight: 400;
    line-height: 1.1;
    ${({theme}) => theme.breakpoints.tablet} {
        font-size: 14px;
        text-align: left;
    }
`;

const Status = styled(Description)`
    font-size: 18px;
    color: ${({theme}) => theme.lightText};
    ${({theme}) => theme.breakpoints.tablet} {
        font-size: 16px;
        text-align: center;
    }
`;

const FullName = styled.span`
    font-size: 26px;
    font-weight: 700;
    line-height: 1.2;
    margin: 0 0 25px 0;
    overflow: hidden;
    &:last-child {
        margin: 0;
    }
    ${({theme}) => theme.breakpoints.tablet} {
        font-size: 20px;
    }
`;

const BottomSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 15px 25px;
    border-top: 1px solid ${({ theme }) => theme.border};
    ${({theme}) => theme.breakpoints.tablet} {
        flex-direction: column;
        padding: 15px;
    } 
   
`;

const Actions = styled.div`
    display: flex;
`;

const Contacts = styled.div`
    flex: 1 1 auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0 0 0 25px;
    &:first-child {
        margin: 0;
    }
    ${({theme}) => theme.breakpoints.tablet} {
        margin: 15px 0 0 0;
    }
`;



const Card = props => {
    const { isAuth, pageID } = props;

    const profileStatus = useSelector(selectProfileStatus);
    const profileData = useSelector(selectProfileData);
    const isFollowed = useSelector(selectFollowStatus);

    const {
        userId,
        aboutMe,
        fullName,
        photos,
        lookingForAJobDescription,
        contacts
    } = profileData;

    

    return (
        <Wrapper>
            <Content>
                <Avatar>
                    <img src={photos?.large || avatar} alt="avatar" />
                </Avatar>
                <Info>
                    {
                        profileStatus &&

                        <Section>
                            <Status>
                                {profileStatus}
                            </Status>
                        </Section>
                    }
                    <FullName>
                        {checkLength(fullName, 20)}
                    </FullName>
                    {
                        aboutMe &&

                        <Section>
                            <Title>
                                About me:
                            </Title>
                            <Description>
                                {aboutMe}
                            </Description>
                        </Section>
                    }
                    {
                        lookingForAJobDescription &&

                        <Section>
                            <Title>
                                Looking for a job:
                            </Title>
                            <Description>
                                {lookingForAJobDescription}
                            </Description>
                        </Section>
                    }
                </Info>
            </Content>
            {
                (isAuth || Object.values({...contacts}).some(contact => contact)) &&

                <BottomSection>
                    {
                        isAuth && pageID ?

                        <Actions>
                            <FollowButton userID={userId} isFollowed={isFollowed} />
                        </Actions> :

                        isAuth && !pageID ?

                        <Actions>
                            <Button as={NavLink} to="/profile/edit" color="blue" style={{minWidth: '150px'}}>
                                Edit profile
                            </Button>
                        </Actions> :

                        null
                    }
                    {
                        Object.values({...contacts}).some(contact => contact) && 

                        <Contacts>
                            <ContactLink as={VK} href={contacts?.vk} />
                            <ContactLink as={Facebook} href={contacts?.facebook} />
                            <ContactLink as={Instagram} href={contacts?.instagram} />
                            <ContactLink as={YouTube} href={contacts?.youtube} />
                            <ContactLink as={Twitter} href={contacts?.twitter} />
                            <ContactLink as={GitHub} href={contacts?.github} />
                            <ContactLink as={Link} href={contacts?.mainLink} />
                        </Contacts>
                    }
                </BottomSection>
            }     
        </Wrapper>
    )
}



export default Card;