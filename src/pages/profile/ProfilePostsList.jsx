import styled from 'styled-components';



const Wrapper = styled.div`
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 25px;

    ${({theme}) => theme.breakpoints.tablet} {
        font-size: 14px;
        padding: 15px;
    } 
`;



const PostsList = props => {

    return (
        <Wrapper>
            This functionality is being developed
        </Wrapper>
    )
}



export default PostsList;