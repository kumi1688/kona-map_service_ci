import React from 'react';
import {Link} from 'react-router-dom';
import styled, {css} from 'styled-components';
import palette from "../../lib/styles/palette";

const buttonStyle = css`
    border: none;
    font-size: 1rem;
    font-weight: bold;
   padding: 0.1rem 1rem;
   color: white;
   cursor: pointer;
   
   background: ${palette.cyan[7]};
   &:hover{
   background: ${palette.cyan[5]};
   }
   
   ${props=> props.fullWidth && 
    css`
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        width: 100%;
        font-size: 1.125rem;
        `}
   `;

const StyledButton = styled.button`
    ${buttonStyle}
    `;

const StyledLink = styled(Link)`
${buttonStyle}
`;

const Button = props => {
    return props.to ? ( <StyledLink {...props} cyan={props.cyan ? 1:0} /> )
            : ( <StyledButton {...props}/> );
};


export default Button;
