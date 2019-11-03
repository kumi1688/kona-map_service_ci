import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../modules/auth";
import {fetchUserData} from "../../modules/auth";
import UserInfoShowForm from "../../components/auth/UserInfoShowForm";

const UserInfoContainer = () => {
    const dispatch = useDispatch();
    const {loading, user} = useSelector(({loading, user}) => ({
        loading: loading['auth/FETCH_USER_DATA'],
        user: user,
    }));

    const onLoad = useCallback( (e) =>{
        dispatch(fetchUserData);
            const {form, user} = form;
            console.dir(form);
            console.dir(user);
        }, []);

    return (
        <UserInfoShowForm user={user} onLoad={onLoad}/>
    )
};

export default UserInfoContainer;
