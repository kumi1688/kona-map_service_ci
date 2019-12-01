import { createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../lib/createRequestSaga";
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =  createRequestActionTypes('auth/REGISTER',);
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');
const [FETCH_USER_DATA, FETCH_USER_DATA_SUCCESS, FETCH_USER_DATA_FAILURE] = createRequestActionTypes('auth/FETCH_USER_DATA');
const [FETCH_USER_STATISTICS, FETCH_USER_STATISTICS_SUCCCES, FETCH_USER_STATISTICS_FAILURE] = createRequestActionTypes('auth/FETCH_USER_AGGREGATION');
const [FETCH_USER_DATA_LIST, FETCH_USER_DATA_LIST_SUCCESS, FETCH_USER_DATA_LIST_FAILURE] = createRequestActionTypes(('auth/FETCH_USER_DATA_LIST'));
const [SET_WATCH, SET_WATCH_SUCCESS, SET_WATCH_FAILURE] = createRequestActionTypes('auth/SET_WATCH');
const [SET_BLOCK, SET_BLOCK_SUCCESS, SET_BLOCK_FAILURE] = createRequestActionTypes('auth/SET_BLOCK');

export const changeField = createAction(
    CHANGE_FIELD,
    ({form, key, value}) => ({
        form, key, value
    }),
);

export const login = createAction(LOGIN, ({username, password}) => ({
    username, password,
}));
export const fetchUserData = createAction(FETCH_USER_DATA,
    ({username, firstLivingArea, secondLivingArea, gender, age, providingInfo}) =>
        ({username, firstLivingArea, secondLivingArea, gender, age, providingInfo
}));
export const fetchUserDataList = createAction(FETCH_USER_DATA_LIST);
export const setWatch = createAction(SET_WATCH, ({username, status}) => ({username, status}));
export const fetchUserStatistics = createAction(FETCH_USER_STATISTICS, userNumber => userNumber);
export const setBlock = createAction(SET_BLOCK, ({username, status}) => ({username, status}));


//const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const fetchUserStatisticsSaga = createRequestSaga(FETCH_USER_STATISTICS, authAPI.getUserStatistics);
const fetchUserDataSaga = createRequestSaga(FETCH_USER_DATA, authAPI.fetchUserData);
const fetchUserDataListSaga = createRequestSaga(FETCH_USER_DATA_LIST, authAPI.fetchUserDataList);
const setWatchSaga = createRequestSaga(SET_WATCH, authAPI.setWatch);
const setBlockSaga = createRequestSaga(SET_BLOCK, authAPI.setBlock);

export function* authSaga(){
    //yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(LOGIN, loginSaga);
    yield takeLatest(FETCH_USER_STATISTICS, fetchUserStatisticsSaga);
    yield takeLatest(FETCH_USER_DATA_LIST, fetchUserDataListSaga);
    yield takeLatest(FETCH_USER_DATA, fetchUserDataSaga);
    yield takeLatest(SET_WATCH, setWatchSaga);
    yield takeLatest(SET_BLOCK, setBlockSaga);
}

const initialState = {
    login: {
        username: '',
        password: '',
    },
    userStatistics: null,
    auth: null,
    authError: null,
    userInfo: null,
    userInfoList: null,
};

const auth = handleActions(
    {
        [CHANGE_FIELD]: (state, { payload: { form, key, value}}) =>
            produce(state, draft => {
                draft[form][key] = value;
            }),
        [INITIALIZE_FORM]: (state, { payload: form}) => ({
            ...state,
            [form]: initialState[form],
            authError: null,
        }),
        [REGISTER_SUCCESS]: (state, {payload : auth}) => ({
            ...state,
            authError: null,
            auth,
        }),
        [REGISTER_FAILURE]: (state, {payload: error}) => ({
            ...state,
            authError: error,
        }),
        [LOGIN_SUCCESS]: (state, {payload: auth}) => ({
            ...state,
            authError:null,
            auth,
        }),
        [LOGIN_FAILURE]: (state, {payload: error}) => ({
            ...state,
            authError: error,
        }),
        [FETCH_USER_DATA_SUCCESS]: (state, {payload: userInfo}) => ({
            ...state,
            authError:null,
            userInfo,
        }),
        [FETCH_USER_DATA_FAILURE]: (state, {payload: error}) => ({
            ...state,
            authError: error,
        }),
        [FETCH_USER_STATISTICS_SUCCCES]: (state, {payload: userStatistics}) => ({
           ...state,
           userStatistics: userStatistics,
           authError: null,
        }),
        [FETCH_USER_STATISTICS_FAILURE]: (state, {payload: error}) => ({
            ...state,
            authError: error,
        }),
        [FETCH_USER_DATA_LIST_SUCCESS]: (state, {payload: userInfoList}) => ({
            ...state,
            userInfoList: userInfoList,
            authError: null
        }),
        [FETCH_USER_DATA_LIST_FAILURE]: (state, {payload: error}) => ({
            ...state,
            authError: error
        }),
        [SET_WATCH_SUCCESS]: (state, {payload : status}) => ({
            ...state,
            authError: null,
        }),
        [SET_WATCH_FAILURE]: (state, {payload: error}) => ({
            ...state,
            authError: error
        }),
        [SET_BLOCK_SUCCESS] : (state, {payload: stauts}) => ({
            ...state,
            authError: null
        }),
        [SET_BLOCK_FAILURE] : (state, {payload: error}) => ({
            ...state,
            authError: error
        })

    },
    initialState,
);

export default auth;
