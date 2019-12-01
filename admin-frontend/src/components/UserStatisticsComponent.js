import React, {useEffect} from 'react';
import styled from "styled-components";
import user from "../modules/user";

const StyledWrapper = styled.div`
    padding-left : 70px;
`;

const UserStatisticsComponent = ({userStatistics}) => {
    useEffect(()=>{
        console.dir(userStatistics);
    }, []);

    return (
        <StyledWrapper>
            <h2>현재 등록된 총 유저 수 : {userStatistics.total}</h2>
            <h2>성별 통계 : <br/>
                <p>남성 : {userStatistics.gender.man}</p>
                <p>여성 : {userStatistics.gender.woman}</p>
            </h2>
            <h2>나이 통계 : <br/> 
                <p>10대 미만 {userStatistics.age.zero}</p>
                <p>10대 {userStatistics.age.one}</p>
                <p>20대 {userStatistics.age.two}</p>
                <p>30대 {userStatistics.age.three}</p>
                <p>40대 {userStatistics.age.four}</p>
                <p>50대 {userStatistics.age.five}</p>
                <p>60대 {userStatistics.age.six}</p>
                <p>70대 {userStatistics.age.seven}</p>
                <p>80대 {userStatistics.age.eight}</p>
                <p>90대 {userStatistics.age.nine}</p>
            </h2>
            <h2>지역별 통계 : </h2>
        </StyledWrapper>
    );
};

export default UserStatisticsComponent;
