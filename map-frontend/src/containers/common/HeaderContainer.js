import React, {useReducer} from 'react';
import {useSelector, useDispatch} from "react-redux";
import Header from '../../components/common/Header';
import {logout} from "../../modules/user";

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

    return (
        <Header user={user} onLogout={onLogout} setAddInfo={setAddInfo} setAddRoad={setAddRoad}/>
    );
};

export default HeaderContainer;
