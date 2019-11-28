import React from 'react';
import {Helmet} from 'react-helmet-async';
import SideBarContainter from "./containers/map/SideBarContainer";
import HeaderContainer from "./containers/common/HeaderContainer";


const App = () => {
    return (
        <>
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
