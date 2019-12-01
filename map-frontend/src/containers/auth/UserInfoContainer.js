import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserData} from "../../modules/auth";
import UserInfoShowForm from "../../components/auth/UserInfoShowForm";

const UserInfoContainer = () => {
    const dispatch = useDispatch();
    const { userInfo, user } = useSelector(({loading, auth, user}) => ({
        loading: loading['auth/FETCH_USER_DATA'],
        userInfo: auth.userInfo,
        user: user.user,
    }));

    useEffect( ( ) => {
        const fetchData = async () => {
            await dispatch(fetchUserData(user.username));
        };
        fetchData();
    }, [user]);

    if(!userInfo) return null;

    return (
        <UserInfoShowForm userInfo={userInfo} />
    );
};

export default UserInfoContainer;
