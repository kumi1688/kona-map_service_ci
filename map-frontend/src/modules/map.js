import {createAction, handleActions} from 'redux-actions';
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../lib/createRequestSaga";
import * as mapAPI from '../lib/api/map';

const [LIST, LIST_SUCCESS, LIST_FAILURE] = createRequestActionTypes('map/LIST');
const [POST_USER_PLACE, POST_USER_PLACE_SUCCESS, POST_USER_PLACE_FAILURE] = createRequestActionTypes('map/POST_USER_PLACE');

export const list = createAction(LIST, info=>info);
export const post = createAction(POST_USER_PLACE, ({name, description, tags, position, detailedPosition}) => ({
    name, description, tags, position, detailedPosition,
}));

//{name, description, tags, position, detailedPosition, publishingDate}

const listUserPlaceSaga = createRequestSaga(LIST, mapAPI.list);
const postUserPlaceSaga = createRequestSaga(POST_USER_PLACE, mapAPI.post);

export function* mapSaga(){
    yield takeLatest(LIST, listUserPlaceSaga);
    yield takeLatest(POST_USER_PLACE, postUserPlaceSaga);
}

const initialState = {
    info: {
        name: '',
        description: '',
        tags: [],
        position: {lat: '', lng: ''},
        detailedPosition: '',
        publishingDate: '',
    },
    error: null,
};
const map = handleActions(
    {
        [LIST_SUCCESS]: (state, {payload: info}) => ({
            ...state,
            info,
        }, console.dir(info)),
        [LIST_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error,
        }),
        [POST_USER_PLACE_SUCCESS]: (state, {payload: info}) => ({
            ...state,
            info,
        }, console.dir(info)),
        [POST_USER_PLACE_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error,
        }),
    },
    initialState,
);

export default map;



