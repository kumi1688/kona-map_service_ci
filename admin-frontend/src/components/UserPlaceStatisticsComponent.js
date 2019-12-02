import React from 'react';
import styled from "styled-components";

const StyledWrapper = styled.div`
    padding-left : 70px;
`;

const UserPlaceStatisticsComponent = ({userPlaceStatistics, userRoadStatistics}) => {

    return (
        <StyledWrapper>
            <h2>등록된 총 위치 게시물 : {userPlaceStatistics.totalNumber}</h2>
            <h2>등록된 총 경로 게시물 : {userRoadStatistics.totalNumber}</h2>
        </StyledWrapper>
    );
};

export default UserPlaceStatisticsComponent;
