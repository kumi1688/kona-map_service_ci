import { combineReducers} from "redux";
import loading from "./loading";
import {all} from 'redux-saga/effects';
import auth, {authSaga} from "./auth";
import user, {userSaga} from "./user";
import write, {writeSaga} from './write';
import post, {postSaga} from "./post";
import posts, {postsSaga} from "./posts";
import map, {mapSaga} from "./map";

const rootReducer = combineReducers({
    auth, loading, user, write, post, posts, map
});

export function* rootSaga() {
    yield all([authSaga(), userSaga(), writeSaga(), postSaga(), postsSaga(), mapSaga()]);
};

export default rootReducer;
