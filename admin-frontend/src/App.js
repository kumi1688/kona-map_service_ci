import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {login} from './modules/auth';
import {check} from "./modules/user";
import HeaderContainer from "./container/HeaderContainer";
import SideBarContainter from "./container/SidebarContainer";


const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            try {
                const result = await dispatch(login({username: "admin", password: "1234"}));
                dispatch(check());
                console.dir(result);
            } catch (e) {
                console.dir(e);
            }
        };
        tryLogin();
    }, []);

    return (
        <>
            <HeaderContainer/>
            <SideBarContainter/>
        </>
    );
};

export default App;
