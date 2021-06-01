import styled, { css } from 'styled-components';



const Icon = styled.svg`
    width: 20px;
    height: 20px;
    fill: ${({theme}) => theme.mainText};

    ${({button}) => button && css`

        ${({theme}) => theme.breakpoints.desktop} {
            display: none;
        }
    `};
`;



export default Icon;