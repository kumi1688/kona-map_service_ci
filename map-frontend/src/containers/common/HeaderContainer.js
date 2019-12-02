import React, {useEffect, useReducer} from 'react';
import {useSelector, useDispatch} from "react-redux";
import Header from '../../components/common/Header';
import {logout} from "../../modules/user";
import {addBookMark, setAddInfoOnMap, setAddRoadOnMap} from "../../modules/map";

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

const HeaderContainer = () => {
    const [localInfo, setLocalInfo] = useReducer(infoReducer, initialState);
    const {user} = useSelector(({user}) => ({user: user.user}));
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout());
    };

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

export default HeaderContainer;
