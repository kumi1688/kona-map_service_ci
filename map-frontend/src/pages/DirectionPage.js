import React from 'react';
import DirectionContainer from "../containers/map/DirectionContainer";
import styled from "styled-components";

const StyledDirectionWrapper = styled.div`
    padding-left : 70px;
`;

const DirectionPage = () => {
    return (
        <StyledDirectionWrapper>
            <DirectionContainer/>
        </StyledDirectionWrapper>
    );
};

export default DirectionPage;
