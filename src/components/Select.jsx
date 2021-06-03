import styled from 'styled-components';

import Icon from './Icon';

import { ReactComponent as ArrowDown } from '../assets/icons/arrow-down.svg';



const Wrapper = styled.div`
    position: relative;
`;

const SelectIcon = styled(Icon)`
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-42%);
    width: 12px;
    height: 12px;
    fill: ${({theme}) => theme.border};
`;

const StyledSelect = styled.select`
    min-width: 75px;
    background: ${({ theme }) => theme.lightBackground};;
    border: 2px solid ${({theme}) => theme.border};
    border-radius: 5px;
    font-family: 'Quicksand';
    font-size: 16px;
    font-weight: 500;
    color: ${({theme}) => theme.lightText};
    padding: 2.5px 10px;

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    ${({theme}) => theme.breakpoints.tablet} {
        min-width: 65px;
        font-size: 14px;
    } 
`;



const Select = props => {
    return (
        <Wrapper>
            <SelectIcon as={ArrowDown} />
            <StyledSelect {...props} />
        </Wrapper>
    )
}



export default Select;