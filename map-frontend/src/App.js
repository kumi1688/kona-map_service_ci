import React from 'react';
import {Route} from 'react-router-dom';
import PostPage from "./pages/PostPage";
import PostListPage from "./pages/PostListPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WritePage from "./pages/WritePage";
import MapPage from "./pages/MapPage";
import {Helmet} from 'react-helmet-async';
import UserInfoPage from "./pages/UserInfoPage";
import UserPlacePage from "./pages/UserPlacePage";
import GeoPage from "./pages/GeoPage";
import DirectionPage from "./pages/DirectionPage";
import OverlayPage from "./pages/OverlayPage";
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
                {/*
                <Route component={LoginPage} path="/login" exact/>
                <Route component={RegisterPage} path="/register" exact/>
                <Route component={PostPage} path="/@:username/:postId" exact/>
                <Route component={MapPage} path={["/map", "/"]} exact/>
                <Route component={UserPlacePage} path={"/userPlace"} exact/>
                <Route component={GeoPage} path={["/geo"]} exact/>
                <Route component={DirectionPage} path={"/direction"} exact/>
                <Route component={OverlayPage} path={"/overlay"} exact/>
                */}
            </>

        </>
    );
};

export default App;
