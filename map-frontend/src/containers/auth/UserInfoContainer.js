import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserData} from "../../modules/auth";
import UserInfoShowForm from "../../components/auth/UserInfoShowForm";

const UserInfoContainer = () => {
    const dispatch = useDispatch();
    const { userInfo, user } = useSelector(({loading, auth, user}) => ({
        loading: loading['auth/FETCH_USER_DATA'],
        auth: auth,
        userInfo: auth.userInfo,
        user: user.user,
    }));

    useEffect( ( ) => {
        const fetchData = async () => {
            await dispatch(fetchUserData(user));
        }
        fetchData();
    }, []);

    return (
        <UserInfoShowForm userInfo={userInfo} user={user} />
    );
};

export default UserInfoContainer;
