import React, {useEffect} from 'react';
import UserStatisticsComponent from "../components/UserStatisticsComponent";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserNumber} from "../modules/auth";

const UserStatisticsContainer = () => {
    const {userNumber} = useSelector(({auth}) => ({
        userNumber: auth.userStatistics.totalNumber
    }));
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchUserNumber());
    }, []);

    if(!userNumber) return null;

    return (
        <>
            <UserStatisticsComponent userNumber={userNumber}/>
        </>
    )
};

export default UserStatisticsContainer;
