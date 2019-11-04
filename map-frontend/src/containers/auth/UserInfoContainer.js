import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserData} from "../../modules/auth";
import UserInfoShowForm from "../../components/auth/UserInfoShowForm";

const UserInfoContainer = () => {
    const dispatch = useDispatch();
    const {loading, auth, userInfo, user } = useSelector(({loading, auth, user}) => ({
        loading: loading['auth/FETCH_USER_DATA'],
        auth: auth,
        userInfo: auth.userInfo,
        user: user.user,
    }));

    const onLoad = useEffect( (e) =>{
        dispatch(fetchUserData(user));
        }, []);

    return (
        <UserInfoShowForm userInfo={userInfo} onLoad={onLoad} user={user} />
    )
};

export default UserInfoContainer;
