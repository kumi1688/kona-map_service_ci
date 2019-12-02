import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchUserPlaceStatistics, fetchUserRoadStatistics} from '../modules/userPlace';
import UserPlaceStatisticsComponent from "../components/UserPlaceStatisticsComponent";

const UserPlaceStatisticsContainer = () => {
    const {userPlaceStatistics, userRoadStatistics} = useSelector(({userPlace}) => ({
        userPlaceStatistics: userPlace.userPlaceStatistics,
        userRoadStatistics: userPlace.userRoadStatistics
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserPlaceStatistics());
        dispatch(fetchUserRoadStatistics());
    }, []);

    if(!userPlaceStatistics || !userRoadStatistics) return null;

    return(
        <UserPlaceStatisticsComponent userPlaceStatistics={userPlaceStatistics}
        userRoadStatistics={userRoadStatistics}/>
    );
};

export default UserPlaceStatisticsContainer;
