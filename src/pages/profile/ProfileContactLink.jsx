import styled from 'styled-components';

import Icon from '../../components/Icon';



const Wrapper = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({theme}) => theme.lightText};
    border-radius: 2px;
    padding: 5px;
    margin: 0 15px 0 0;

    &:last-child {
        margin: 0;
    }

    ${({theme}) => theme.breakpoints.tablet} {
        padding: 4px;
        margin: 0 10px 0 0;
    }
`;

const ContactIcon = styled(Icon)`
    fill: ${({theme}) => theme.lightBackground};
`;



const ContactLink = ({ href, ...props }) => {
    return (
        <>
            {   
                href &&

                <Wrapper href={href} target="_blank">
                    <ContactIcon {...props} />
                </Wrapper>
            }
        </>
    )
}



export default ContactLink;