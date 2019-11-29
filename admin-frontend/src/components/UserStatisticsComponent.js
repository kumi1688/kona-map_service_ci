import React from 'react';
import styled from "styled-components";

const StyledWrapper = styled.div`
    padding-left : 70px;
`;

const UserStatisticsComponent = ({userNumber}) => {
    return (
        <StyledWrapper>
            <h2>현재 등록된 총 유저 수 : {userNumber}</h2>
            <h2>성별 통계 : <br/>
                <h3>남성 : </h3>
                <h3>여성 : </h3>
            </h2>
            <h2>나이 통계 : </h2>
            <h2>지역별 통계 : </h2>
        </StyledWrapper>
    );
};

export default UserStatisticsComponent;
