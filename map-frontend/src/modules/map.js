import {createAction, handleActions} from 'redux-actions';
import produce from "immer";
import {createRequestActionTypes} from "../lib/createRequestSaga";

const [LIST, LIST_SUCCESS, LIST_FAILURE] = createRequestActionTypes('map/LIST');

