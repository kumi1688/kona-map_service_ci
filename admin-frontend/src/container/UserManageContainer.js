import React, {useEffect} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserDataList} from "../modules/auth";
import UserManagerComponent from "../components/UserManagerComponent";

const StyledWrapper = styled.div`
    padding-left : 60px;
`;

const UserManageContainer = () => {
    const {userInfoList} = useSelector(({auth}) => ({
        userInfoList: auth.userInfoList,
    }));
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(fetchUserDataList());
    }, []);

    if(!userInfoList) return null;

    return (
        <StyledWrapper>
            <UserManagerComponent userInfoList={userInfoList}/>
        </StyledWrapper>
    )
};

export default UserManageContainer;
