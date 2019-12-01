import React from 'react';
import {Helmet} from 'react-helmet-async';
import SideBarContainter from "./containers/map/SideBarContainer";
import HeaderContainer from "./containers/common/HeaderContainer";
import AlertModal from "./components/common/AlertModal";


const App = () => {
    return (
        <>
            <AlertModal bodyText="helhelh" titleText="asdfasdf"/>
            <HeaderContainer/>
            <SideBarContainter/>
            <>
                <Helmet>
                    <title>KONA</title>
                </Helmet>
            </>

        </>
    );
};

export default App;
