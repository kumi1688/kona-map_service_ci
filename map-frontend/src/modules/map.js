import {createAction, handleActions} from 'redux-actions';
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../lib/createRequestSaga";
import * as mapAPI from '../lib/api/map';

const [LIST, LIST_SUCCESS, LIST_FAILURE] = createRequestActionTypes('map/LIST');
const [POST_USER_PLACE, POST_USER_PLACE_SUCCESS, POST_USER_PLACE_FAILURE] = createRequestActionTypes('map/POST_USER_PLACE');
const SET_SEARCH_QUERY = 'map/SET_SEARCH_QUERY';
const SET_CURRENT_USER_LOCATION = 'map/SET_CURRENT_USER_LOCATION';
const SET_COMMENT_PLCAE_ID = 'map/SET_COMMENT_PLACE_ID';

// 액션에 할당된 파라미터의 값이 어떤것인지 알 수 없기 때문에 파라미터로 전달받은 값을 action의 payload로 설정함
export const list = createAction(LIST, info => info);
export const post = createAction(POST_USER_PLACE, ({name, description, tags, position, detailedPosition}) => ({
    name, description, tags, position, detailedPosition,
}));

export const setSearchQuery = createAction(SET_SEARCH_QUERY, ({searchQuery, searchQueryType, searchQueryOnMap}) => ({
    searchQuery, searchQueryType, searchQueryOnMap
}));
export const setCurrentUserLocation = createAction(SET_CURRENT_USER_LOCATION, (location) => (location));

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
    comment: {
        selectedPlaceId: '',
    },
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
        }, console.dir(info)),
        [LIST_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error,
        }),
        [POST_USER_PLACE_SUCCESS]: (state, {payload: info}) => ({
            ...state,
            info: info
        }, console.dir(info)),
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
    },
    initialState,
);

export default map;
