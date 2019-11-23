import {createAction, handleActions} from 'redux-actions';
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../lib/createRequestSaga";
import * as mapAPI from '../lib/api/map';

const [LIST, LIST_SUCCESS, LIST_FAILURE] = createRequestActionTypes('map/LIST');
const [POST_USER_PLACE, POST_USER_PLACE_SUCCESS, POST_USER_PLACE_FAILURE] = createRequestActionTypes('map/POST_USER_PLACE');
const SET_SEARCH_QUERY = 'map/SET_SEARCH_QUERY';
const SET_CURRENT_USER_LOCATION = 'map/SET_CURRENT_USER_LOCATION';
const SET_COMMENT_LIST  = 'map/SET_COMMENT_LIST';
const SET_COMMENT = 'map/SET_COMMENT';
const SET_ADD_INFO_ON_MAP = 'map/SET_ADD_INFO_ON_MAP';
const SET_ADD_ROAD_ON_MAP = 'map/SET_ADD_ROAD_ON_MAP';
const SET_ROAD_TYPE_ON_MAP = 'map/SET_ROAD_TYPE_ON_MAP';

// 액션에 할당된 파라미터의 값이 어떤것인지 알 수 없기 때문에 파라미터로 전달받은 값을 action의 payload로 설정함
export const list = createAction(LIST, info => info);
export const post = createAction(POST_USER_PLACE, ({name, description, tags, position, detailedPosition}) => ({
    name, description, tags, position, detailedPosition,
}));
export const setSearchQuery = createAction(SET_SEARCH_QUERY, ({searchQuery, searchQueryType, searchQueryOnMap}) => ({
    searchQuery, searchQueryType, searchQueryOnMap
}));

export const setCurrentUserLocation = createAction(SET_CURRENT_USER_LOCATION, location => location);
export const setCommentList = createAction(SET_COMMENT_LIST, (commentList) => (commentList) );
export const setComment = createAction(SET_COMMENT, comment => comment);
export const setAddInfoOnMap = createAction(SET_ADD_INFO_ON_MAP, isAddInfo => isAddInfo);
export const setAddRoadOnMap = createAction(SET_ADD_ROAD_ON_MAP, isAddRoad => isAddRoad);
export const setRoadTypeOnMap = createAction(SET_ROAD_TYPE_ON_MAP, roadType => roadType);

//{name, description, tags, position, detailedPosition, publishingDate}

const listUserPlaceSaga = createRequestSaga(LIST, mapAPI.list);
const postUserPlaceSaga = createRequestSaga(POST_USER_PLACE, mapAPI.post);

export function* mapSaga() {
    yield takeLatest(LIST, listUserPlaceSaga);
    yield takeLatest(POST_USER_PLACE, postUserPlaceSaga);
}

const initialState = {
    searchQuery: {
        searchQueryType: '',
        searchQuery: '',
        searchQueryOnMap: false,
    },
    currentUserLocaction: {
        lat: '',
        lng: '',
    },
    commentList : null,
    comment: null,
    isAddInfo: false,
    isAddRoad: false,
    roadType: 'mainRoad',
    info: {
        name: '',
        description: '',
        tags: [],
        position: {lat: '', lng: ''},
        detailedPosition: '',
        publishingDate: '',
        id: '',
        primaryPositionType: '',
        secondaryPositionType: '',
        radius: 0,
    },
    error: null,
};

const map = handleActions(
    {
        //첫번째 파라미터로 액션에 따라 실행할 함수를 가지고 있는 객체
        //두번째 파라미터로 상태의 기본값(initialState)
        [LIST_SUCCESS]: (state, {payload: info}) => ({
            ...state,
            info: info
        }),
        [LIST_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error,
        }),
        [POST_USER_PLACE_SUCCESS]: (state, {payload: info}) => ({
            ...state,
            info: info
        }),
        [POST_USER_PLACE_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error,
        }),
        [SET_SEARCH_QUERY]: (state, {payload: query}) => ({
            ...state,
            searchQuery: query,
        }),
        [SET_CURRENT_USER_LOCATION]: (state, {payload: location}) => ({
            ...state,
            currentUserLocaction: location,
        }),
        [SET_COMMENT_LIST] : (state, {payload: commentList}) => ({
           ...state,
           commentList: commentList,
        }),
        [SET_COMMENT] : (state, {payload: comment}) => ({
            ...state,
            comment: comment,
        }),
        [SET_ADD_INFO_ON_MAP] : (state, {payload: isAddInfo}) => ({
            ...state,
            isAddInfo: isAddInfo
        }),
        [SET_ADD_ROAD_ON_MAP] : (state, {payload: isAddRoad}) => ({
            ...state,
            isAddRoad: isAddRoad
        }),
        [SET_ROAD_TYPE_ON_MAP] : (state, {payload: roadType}) => ({
            ...state,
            roadType: roadType
        }),
    },
    initialState,
);

export default map;
