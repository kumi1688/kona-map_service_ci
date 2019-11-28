import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider, useDispatch} from 'react-redux';
import {createStore, applyMiddleware} from "redux";
import rootReducer from "./modules";
import {composeWithDevTools} from "redux-devtools-extension";
import createSagaMiddleware from 'redux-saga';
import {HelmetProvider} from 'react-helmet-async';
import {tempSetUser, check} from "./modules/user";
import {rootSaga} from "./modules";
import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from "react-alert-template-basic";
import 'bootstrap/dist/css/bootstrap.min.css';



import App from './App';
import * as serviceWorker from './serviceWorker';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

function loadUser() {
    try {
        const user = localStorage.getItem('user');

        store.dispatch(tempSetUser(user));
        store.dispatch(check());
    } catch (e) {
        console.log('로컬 스토리지 작동 x');
    }
}

sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
        <HelmetProvider>
            <AlertProvider template={AlertTemplate}>
                <App/>
            </AlertProvider>
        </HelmetProvider>
    </BrowserRouter>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
