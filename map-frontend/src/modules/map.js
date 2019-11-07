import {createAction, handleActions} from 'redux-actions';
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../lib/createRequestSaga";
import * as mapAPI from '../lib/api/map';

const [LIST, LIST_SUCCESS, LIST_FAILURE] = createRequestActionTypes('map/LIST');
const [POST_USER_PLACE, POST_USER_PLACE_SUCCESS, POST_USER_PLACE_FAILURE] = createRequestActionTypes('map/POST_USER_PLACE');

// 액션에 할당된 파라미터의 값이 어떤것인지 알 수 없기 때문에 파라미터로 전달받은 값을 action의 payload로 설정함
export const list = createAction(LIST, (info) => (
        info
    ));
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
        id: '',
    },
    infoArr: [{
        name: '',
        description: '',
        tags: [],
        position: {lat: '', lng: ''},
        detailedPosition: '',
        publishingDate: '',
    }],
    error: null,
};
const map = handleActions(
    {
        //첫번째 파라미터로 액션에 따라 실행할 함수를 가지고 있는 객체
        //두번째 파라미터로 상태의 기본값(initialState)
        [LIST_SUCCESS]: (state, {payload: info}) => ({
            ...state,
            info: info,
            error: 1,
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
    },
    initialState,
);

export default map;
