import React, {useEffect} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import UserPlaceManageComponent from "../components/UserPlaceManageComponent";
import {fetchUserPlaceList} from "../modules/userPlace";

const StyledWrapper = styled.div`
    padding-left : 60px;
`;

const UserPlaceManageContainer = () => {
    const {userPlaceList} = useSelector(({userPlace}) => ({
        userPlaceList: userPlace.userPlaceList
    }));
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(fetchUserPlaceList());
    }, []);

    if(!userPlaceList) return null;

    return (
        <StyledWrapper>
            <UserPlaceManageComponent userPlaceList={userPlaceList}/>
        </StyledWrapper>
    )
};

export default UserPlaceManageContainer;
