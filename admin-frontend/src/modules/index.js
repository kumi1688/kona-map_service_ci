import { combineReducers} from "redux";
import loading from "./loading";
import {all} from 'redux-saga/effects';
import user, {userSaga} from './user';
import auth from './auth';
import userPlace from "./userPlace";
import {authSaga} from "./auth";
import {userPlaceSaga} from "./userPlace";

const rootReducer = combineReducers({
    auth, loading, user, userPlace
});

export function* rootSaga() {
    yield all([authSaga(), userSaga(), userPlaceSaga()]);
};

export default rootReducer;
