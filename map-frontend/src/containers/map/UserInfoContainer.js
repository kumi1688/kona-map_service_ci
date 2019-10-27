import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from 'react-router-dom';
import { list } from "../../lib/api/map";
import {unloadUserInfo} from "../../modules/map";

const UserInfoContainer = ({match}) => {
    const {userInfoId } = match.params;
    const dispatch = useDispatch();
    const{ info, error, loading } = useSelector(({data, loading}) => ({
        info: data.info,
        error: data.error,
        loading: loading['map/LIST'],
    }));

    useEffect( () => {
        dispatch(list());
        return () => {
            dispatch(unloadUserInfo());
        };
    }, [dispatch]);
    
};

export default UserInfoContainer;
