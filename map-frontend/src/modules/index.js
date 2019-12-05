import { combineReducers} from "redux";
import loading from "./loading";
import {all} from 'redux-saga/effects';
import auth, {authSaga} from "./auth";
import user, {userSaga} from "./user";
import map, {mapSaga} from "./map";

const rootReducer = combineReducers({
    auth, loading, user, map,
});

export function* rootSaga() {
    yield all([authSaga(), userSaga(), mapSaga()]);
};

export default rootReducer;
