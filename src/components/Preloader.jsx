import styled, { css } from 'styled-components';

import { ReactComponent as Puff } from '../assets/icons/puff.svg';



const Wrapper = styled.div`
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: ${({theme}) => theme.mainBackground};
    padding: 65px 10px 10px 10px;

    ${({main}) => main && css`
        position: fixed;
        z-index: 1000;
        padding: 25px;
    `};

    ${({local}) => local && css`
        position: relative;
        height: auto;
        padding: 25px;
    `};
`;

const PuffIcon = styled(Puff)`
    width: 50px;
    height: 50px;
    stroke: ${({theme}) => theme.mainColor};
`;



const Preloader = props => {
    return (
        <Wrapper {...props}>
            <PuffIcon />
        </Wrapper>
    )
}



export default Preloader;