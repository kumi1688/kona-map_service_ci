import React, {useEffect} from 'react';
import UserStatisticsComponent from "../components/UserStatisticsComponent";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserStatistics} from "../modules/auth";

const UserStatisticsContainer = () => {
    const {userStatistics} = useSelector(({auth}) => ({
        userStatistics: auth.userStatistics
    }));
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchUserStatistics());

    }, []);


    if(!userStatistics) return null;

    return (
        <>
            <UserStatisticsComponent userStatistics={userStatistics}/>
        </>
    )
};

export default UserStatisticsContainer;
