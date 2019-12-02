import { createAction, handleActions} from 'redux-actions';
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../lib/createRequestSaga";
import * as adminAPI from '../lib/api/admin';

const [FETCH_USER_PLACE_STATISTICS, FETCH_USER_PLACE_STATISTICS_SUCCESS, FETCH_USER_PLACE_STATISTICS_FAILURE] =
    createRequestActionTypes('admin/FETCH_USER_PLACE_STATISTICS');
const [FETCH_USER_ROAD_STATISTICS, FETCH_USER_ROAD_STATISTICS_SUCCESS, FETCH_USER_ROAD_STATISTICS_FAILURE] =
    createRequestActionTypes('admin/FETCH_USER_ROAD_STATISTICS');
const [FETCH_USER_PLACE_LIST, FETCH_USER_PLACE_LIST_SUCCESS, FETCH_USER_PLACE_LIST_FAILURE] =
    createRequestActionTypes('admin/FETCH_USER_PLACE_LIST');
const [FETCH_USER_ROAD_LIST, FETCH_USER_ROAD_LIST_SUCCESS, FETCH_USER_ROAD_LIST_FAILURE] =
    createRequestActionTypes('admin/FETCH_USER_ROAD_LIST');

export const fetchUserPlaceStatistics = createAction(FETCH_USER_PLACE_STATISTICS, data => data);
export const fetchUserRoadStatistics = createAction(FETCH_USER_ROAD_STATISTICS, data => data);
export const fetchUserPlaceList = createAction(FETCH_USER_PLACE_LIST, data=>data);
export const fetchUserRoadList = createAction(FETCH_USER_ROAD_LIST, data=>data);

const fetchUserPlaceStatisticsSaga = createRequestSaga(FETCH_USER_PLACE_STATISTICS, adminAPI.fetchUserPlaceStatistics);
const fetchUserRoadStatisticsSaga = createRequestSaga(FETCH_USER_ROAD_STATISTICS, adminAPI.fetchUserRoadStatistics);
const fetchUserPlaceListSaga = createRequestSaga(FETCH_USER_PLACE_LIST, adminAPI.fetchUserPlaceList);
const fetchUserRoadListSaga = createRequestSaga(FETCH_USER_ROAD_LIST, adminAPI.fetchUserRoadList);

export function* userPlaceSaga(){
    yield takeLatest(FETCH_USER_PLACE_STATISTICS, fetchUserPlaceStatisticsSaga);
    yield takeLatest(FETCH_USER_ROAD_STATISTICS, fetchUserRoadStatisticsSaga);
    yield takeLatest(FETCH_USER_PLACE_LIST, fetchUserPlaceListSaga);
    yield takeLatest(FETCH_USER_ROAD_LIST, fetchUserRoadListSaga);
}

const initialState = {
    userPlaceStatistics: null,
    userRoadStatistics: null,
    userPlaceList : null,
    userRoadList : null,
    error: null,
};

const userPlace = handleActions(
    {
        [FETCH_USER_PLACE_STATISTICS_SUCCESS]: (state, {payload: userPlaceStatistics}) => ({
            ...state,
            userPlaceStatistics: userPlaceStatistics,
            error: null,
        }),
        [FETCH_USER_PLACE_STATISTICS_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error: error,
        }),
        [FETCH_USER_ROAD_STATISTICS_SUCCESS]: (state, {payload: userRoadStatistics}) => ({
            ...state,
            userRoadStatistics: userRoadStatistics,
            error: null,
        }),
        [FETCH_USER_ROAD_STATISTICS_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error: error,
        }),
        [FETCH_USER_PLACE_LIST_SUCCESS]: (state, {payload: data}) => ({
            ...state,
            userPlaceList: data
        }),
        [FETCH_USER_PLACE_LIST_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error: error
        }),
        [FETCH_USER_ROAD_LIST_SUCCESS]: (state, {payload: data}) => ({
            ...state,
            userRoadList: data
        }),
        [FETCH_USER_ROAD_LIST_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error: error
        }),

    },
    initialState,
);

export default userPlace;
