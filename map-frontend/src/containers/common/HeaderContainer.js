import React, {useCallback, useEffect, useReducer} from 'react';
import {useSelector, useDispatch} from "react-redux";
import Header from '../../components/common/Header';
import {logout} from "../../modules/user";
import {withRouter} from 'react-router-dom';
import {addBookMark, setAddInfoOnMap, setAddRoadOnMap} from "../../modules/map";
import {resetUserData} from "../../modules/auth";

const initialState = {
    addInfoOnMap: false,
    addRoadOnMap: false,
    addBookMark: false,
    userBlock: false,
};

const infoReducer = (state, action) => {
    switch (action.type) {
        case 'reset': {
            return initialState
        }
        case 'addInfoOnMap': {
            return {...state, addInfoOnMap: action.addInfoOnMap}
        }
        case 'addRoadOnMap': {
            return {...state, addRoadOnMap: action.addRoadOnMap}
        }
        case 'addBookMark' : {
            return {...state, addBookMark: action.addBookMark}
        }
        case 'checkUserBlock' : {
            return {...state, userBlock: action.userBlock}
        }
        default: {
            throw new Error(`unexpected action.type: ${action.type}`)
        }
    }
};

const HeaderContainer = ({location, history}) => {
    const [localInfo, setLocalInfo] = useReducer(infoReducer, initialState);
    const {user, userInfo} = useSelector(({user, auth}) => ({
        user: user.user,
        userInfo: auth.userInfo
    }));
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(resetUserData());
        dispatch(logout());
        alert('로그아웃되었습니다');
        history.push('/login');
    };

    useEffect(() => {
        if(!userInfo && location.pathname !== '/login'){
        }
    }, [location, userInfo]);

    const setAddInfo = value => setLocalInfo({type: 'addInfoOnMap', addInfoOnMap: value});
    const setAddRoad = value => setLocalInfo({type: 'addRoadOnMap', addRoadOnMap: value});
    const setAddBookMark = value => setLocalInfo({type: 'addBookMark', addBookMark: value});
    const checkUserBlock = value => setLocalInfo({type: 'checkUserBlock', userBlock: value});

    useEffect(() => {
        dispatch(setAddInfoOnMap(localInfo.addInfoOnMap));
    }, [localInfo.addInfoOnMap]);
    useEffect(() => {
        dispatch(setAddRoadOnMap(localInfo.addRoadOnMap));
    }, [localInfo.addRoadOnMap]);
    useEffect(() => {
        dispatch(addBookMark(localInfo.addBookMark));
    }, [localInfo.addBookMark]);

    return (
        <Header user={user} onLogout={onLogout} setAddInfo={setAddInfo} setAddRoad={setAddRoad}/>
    );
};

export default withRouter(HeaderContainer);
