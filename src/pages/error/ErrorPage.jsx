import styled from 'styled-components';



const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 25px;
`;

const ErrorMessage = styled.span`
    max-width: 600px;
    background: ${({theme}) => theme.mainBackground};
    font-family: ${({theme}) => theme.secondaryFont};
    font-size: 26px;
    font-weight: 700;
    text-align: center;
    color: ${({theme}) => theme.mainColor};
`;



const ErrorPage = ({ message }) => {
    return (
        <Wrapper>
            <ErrorMessage>
                { message || 'Sorry, the server is not responding...' }
            </ErrorMessage>
        </Wrapper>
    )
}



export default ErrorPage;