import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectAuthStatus } from '../../store/authSlice';

import EditStatus from './EditStatus';
import EditPhoto from './EditPhoto';
import EditProfile from './EditProfile';



const Section = styled.div`
    
    &:not(:last-child) {
        border-bottom: 1px solid ${({ theme }) => theme.border};
        padding: 0 0 50px 0;
        margin: 0 0 50px 0;

        ${({theme}) => theme.breakpoints.tablet} {
            padding: 0 0 25px 0;
            margin: 0 0 25px 0;
        }
    }
`;

const Title = styled.h2`
    font-family: ${({ theme }) => theme.secondaryFont};
    font-size: 24px;
    font-weight: 600;
    margin: 0 0 25px 0;
`;



const EditPage = props => {

    const isAuth = useSelector(selectAuthStatus);



    if (!isAuth) return <Redirect to="/login" />

    return (
        <>  
            <Section>
                <Title>
                    Photo:
                </Title>
                <EditPhoto />
            </Section>
            <Section>
                <Title>
                    Status:
                </Title>
                <EditStatus />
            </Section>
            <Section>
                <Title>
                    Profile info:
                </Title>
                <EditProfile />
            </Section>
        </>
    )
}



export default EditPage;