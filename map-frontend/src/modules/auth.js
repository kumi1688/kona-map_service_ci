import { createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../lib/createRequestSaga";
import * as authAPI from '../lib/api/auth';
import user from "./user";

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const RESET_USER_DATA = 'auth/RESET_USER_DATA';

    const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =  createRequestActionTypes('auth/REGISTER',);
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');
const [FETCH_USER_DATA, FETCH_USER_DATA_SUCCESS, FETCH_USER_DATA_FAILURE] = createRequestActionTypes('auth/FETCH_USER_DATA');

const [ADD_WARNING, ADD_WARNING_SUCCESS, ADD_WARNING_FAILURE] = createRequestActionTypes('auth/ADD_WARNINING');

export const changeField = createAction(
    CHANGE_FIELD,
    ({form, key, value}) => ({
        form, key, value
    }),
);

export const initializeForm = createAction(INITIALIZE_FORM, form => form);
export const register = createAction(REGISTER, ({ username, password, firstLivingArea,
                                                    secondLivingArea, gender, age, providingInfo }) => ({
    username, password, firstLivingArea, secondLivingArea, gender, age, providingInfo
}));
export const login = createAction(LOGIN, ({username, password}) => ({
    username, password,
}));
export const fetchUserData = createAction(FETCH_USER_DATA, username => username);
export const resetUserData = createAction(RESET_USER_DATA);
export const addWarning = createAction(ADD_WARNING, username=>username);

const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const fetchUserDataSaga = createRequestSaga(FETCH_USER_DATA, authAPI.fetchUserData);
const addWarningSaga = createRequestSaga(ADD_WARNING, authAPI.addWarning);

export function* authSaga(){
    yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(LOGIN, loginSaga);
    yield takeLatest(FETCH_USER_DATA, fetchUserDataSaga);
    yield takeLatest(ADD_WARNING, addWarningSaga);
}

const initialState = {
    register: {
        username: '',
        password: '',
        passwordConfirm: '',
        firstLivingArea: '서울특별시',
        secondLivingArea: '종로구',
        gender: '남자',
        age: '10세 미만',
        providingInfo : true
    },
    login: {
        username: '',
        password: '',
    },
    auth: null,
    warning: false,
    authError: null,
    userInfo: null,
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
            userInfo: userInfo
        }),
        [FETCH_USER_DATA_FAILURE]: (state, {payload: error}) => ({
            ...state,
            authError: error,
        }),
        [ADD_WARNING_SUCCESS]: (state, {payload: warning}) => ({
            ...state,
            warning: warning
        }),
        [ADD_WARNING_FAILURE]: (state, {payload: error}) => ({
            ...state,
            authError : error
        }),
        [RESET_USER_DATA] : state => ({
            ...state,
            userInfo: null,
            auth: null
        })
    },
    initialState,
);

export default auth;
