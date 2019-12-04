import React from 'react';
import styled from "styled-components";
import YoutubeContainer from "../containers/common/YoutubeContainer";

const StyledWrapper = styled.div`
    padding-left: 60px;
`;
const YoutubePage = () => {
    return (
    <StyledWrapper>
        <YoutubeContainer/>
    </StyledWrapper>
    );
};

export default YoutubePage;
