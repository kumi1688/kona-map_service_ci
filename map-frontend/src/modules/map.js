import {createAction, handleActions} from 'redux-actions';
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../lib/createRequestSaga";
import * as mapAPI from '../lib/api/map';

const initialState = {
    info: {
        name: '',
        description: '',
        detailedAddress: '',
        tags: [],
        position: {lat: '', lng: ''},
        publishingDate: '',
    },
    error: null,
};

const UNLOAD_LIST = createRequestActionTypes('map/UNLOAD_LIST');
const [LIST, LIST_SUCCESS, LIST_FAILURE] = createRequestActionTypes('map/LIST');

export const list = createAction(LIST, info=>info);
export const unloadUserPlaceList = createAction(UNLOAD_LIST);

const listUserPlaceSaga = createRequestSaga(LIST, mapAPI.list);

export function* mapSaga(){
    yield takeLatest(LIST, listUserPlaceSaga);
}

const map = handleActions(
    {
        [LIST_SUCCESS]: (state, {payload: info}) => ({
            ...state,
            info,
        }),
        [LIST_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error,
        }),
        [UNLOAD_LIST]: () => initialState,
    },
    initialState,
);

export default map;



