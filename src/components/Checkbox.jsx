import { forwardRef } from 'react';
import styled from 'styled-components';

import check from '../assets/icons/check.svg';



const Wrapper = styled.div`
    display: flex;
    align-items: center;

    input:checked + label:before {
        background-image: url(${check});
        background-position: center;
        background-size: contain;
    }
`;

const StyledCheckbox = styled.input`
    display: none;
`;

const Label = styled.label`
    position: relative;
    font-size: 16px;
    color: ${({theme}) => theme.lightText};
    padding: 0 0 0 25px;
    cursor: pointer;

    &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        display: inline-block;
        width: 16px;
        height: 16px;
        background: #fff;
        border: 2px solid ${({theme}) => theme.border};
        border-radius: 2px;
    }
`;



const Checkbox = forwardRef((props, ref) => {
    const { id, label } = props;

    return (
        <Wrapper>
            <StyledCheckbox ref={ref} {...props} type="checkbox" />
            <Label htmlFor={id}>{label}</Label>
        </Wrapper>
    )
});



export default Checkbox;