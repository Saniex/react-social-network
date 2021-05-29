import { createGlobalStyle } from 'styled-components';



export default createGlobalStyle`
    html,
    body {
        background: ${({theme}) => theme.mainBackground};
        font-family: ${({theme}) => theme.mainFont};
        font-size: 16px;
        font-weight: ${({theme}) => theme.weight};
        color: ${({theme}) => theme.mainText};
    }
`;