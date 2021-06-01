import styled, { css } from 'styled-components';



const Wrapper = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid transparent;
    border-radius: ${({theme}) => theme.radius};
    font-family: ${({theme}) => theme.secondaryFont};
    font-size: 16px;
    font-weight: 700;
    color: ${({theme}) => theme.mainText};
    padding: 6px 24px;

    ${({color}) => {
        switch(color) {

            case 'red':
                return css`
                    background: ${({theme}) => theme.red};

                    &,
                    &:hover,
                    &:focus,
                    &:active,
                    &:visited {
                        color: ${({theme}) => theme.darkRed};
                    }
                `;

            case 'green':
                return css`
                    background: ${({theme}) => theme.green};

                    &,
                    &:hover,
                    &:focus,
                    &:active,
                    &:visited {
                        color: ${({theme}) => theme.darkGreen};
                    }
                `;

            case 'blue':
                return css`
                    background: ${({theme}) => theme.blue};

                    &,
                    &:hover,
                    &:focus,
                    &:active,
                    &:visited {
                        color: ${({theme}) => theme.darkBlue};
                    }
                `;

            default:
                return css`
                    background: none;
                `;
        }
    }};

    ${({outlined}) => outlined && css`
        background: ${({theme}) => theme.lightBackground};
        border-color: ${({theme}) => theme.border};
    `};

    ${({theme}) => theme.breakpoints.touch} {
        background: none;
        padding: 10px;

        span {
            display: none;
        }
    }
`;



const Button = props => {
    return (
        <Wrapper {...props} />
    )
}



export default Button;