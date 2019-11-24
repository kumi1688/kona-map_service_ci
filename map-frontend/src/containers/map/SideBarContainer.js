import React, {useEffect, useReducer} from 'react';
import MapPage from "../../pages/MapPage";
import UserInfoPage from "../../pages/UserInfoPage";
import DirectionPage from "../../pages/DirectionPage";
import SideNav, { Nav, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import {Route} from 'react-router-dom';
import {
    faHome,
    faStar,
    faMapMarker,
    faRoad,
    faUser, faAddressCard, faEdit, faComment, faBuilding, faStreetView
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import styled from "styled-components";
import UserCommentShowPage from "../../pages/UserCommentShowPage";
import UserPostShowPage from "../../pages/UserPostShowPage";
import GeoPage from "../../pages/GeoPage";
import {useDispatch, useSelector} from "react-redux";
import {setAddInfoOnMap, setAddRoadOnMap, addBookMark} from "../../modules/map";
import LoginPage from "../../pages/LoginPage";
import BoardComponent from "../common/BoardComponent";
import RegisterPage from "../../pages/RegisterPage";

const StyledSideBar = styled.div`
    height: 100%;
`;

const initialState = {
    addInfoOnMap: false,
    addRoadOnMap: false,
    addBookMark: false
};

const infoReducer = (state, action) => {
    switch (action.type) {
        case 'reset': {
            return initialState
        }
        case 'addInfoOnMap': {
            return {...state, addInfoOnMap: action.addInfoOnMap}
        }
        case 'addRoadOnMap': {
            return {...state, addRoadOnMap: action.addRoadOnMap}
        }
        case 'addBookMark' : {
            return {...state, addBookMark: action.addBookMark}
        }
        default: {
            throw new Error(`unexpected action.type: ${action.type}`)
        }
    }
};

const SideBarContainter = ({history}) => {
    const [localInfo, setLocalInfo] = useReducer(infoReducer, initialState);
    const dispatch = useDispatch();

    const setAddInfo = value => setLocalInfo({type : 'addInfoOnMap', addInfoOnMap: value});
    const setAddRoad = value => setLocalInfo({type : 'addRoadOnMap', addRoadOnMap: value});
    const setAddBookMark = value => setLocalInfo({type: 'addBookMark', addBookMark: value});

    useEffect(() =>{
        dispatch(setAddInfoOnMap(localInfo.addInfoOnMap));
    }, [localInfo.addInfoOnMap]);
    useEffect(()=>{
        dispatch(setAddRoadOnMap(localInfo.addRoadOnMap));
    }, [localInfo.addRoadOnMap]);
    useEffect(() => {
        dispatch(addBookMark(localInfo.addBookMark));
    },[localInfo.addBookMark]);

    return (
        <StyledSideBar>
            <Route render={({history}) => (
                <React.Fragment>
                    <SideNav
                        onSelect={(selected) => {
                            let route = false;
                            const to = '/' + selected;
                            switch(to){
                                case "/" :
                                case "/home":
                                case "/userInfo" :
                                case "/userInfo/post":
                                case "/userInfo/comment":
                                case "/geo" : history.push(to); route = true; break;
                            }


                            if(!route){
                                console.dir(to);
                                switch(to){
                                    case "/addInfo/point":
                                        localInfo.addInfoOnMap ? setAddInfo(false) : setAddInfo(true); break;
                                    case "/addInfo/direction":
                                        localInfo.addRoadOnMap ? setAddRoad(false) : setAddRoad(true); break;
                                    case "/bookMark/addBookmark":
                                        localInfo.addBookMark ? setAddBookMark(false) : setAddBookMark(true); break;
                                }
                            }
                        }}
                    >
                        <SideNav.Toggle/>
                        <SideNav.Nav defaultSelected="home">
                            <NavItem eventKey="home">
                                <NavIcon>
                                    <FontAwesomeIcon icon={faHome} size="2x"/>
                                </NavIcon>
                                <NavText>
                                    메인 화면
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="userInfo">
                                <NavIcon>
                                    <FontAwesomeIcon icon={faUser} size="2x"/>
                                </NavIcon>
                                <NavText>
                                    마이페이지
                                </NavText>

                                <NavItem eventKey="userInfo">
                                    <NavIcon>
                                        <FontAwesomeIcon icon={faAddressCard} size="2x"/>
                                    </NavIcon>
                                    <NavText>
                                        기본정보
                                    </NavText>

                                </NavItem>

                                <NavItem eventKey="userInfo/post">
                                    <NavIcon>
                                        <FontAwesomeIcon icon={faEdit} size="2x"/>
                                    </NavIcon>
                                    <NavText>
                                        내가 작성한 위치 정보
                                    </NavText>
                                </NavItem>

                                <NavItem eventKey="userInfo/comment">
                                    <NavIcon>
                                        <FontAwesomeIcon icon={faComment} size="2x"/>
                                    </NavIcon>
                                    <NavText>
                                        내가 작성한 댓글
                                    </NavText>
                                </NavItem>

                            </NavItem>
                            <NavItem eventKey="bookMark">
                                <NavIcon>
                                    <FontAwesomeIcon icon={faStar} size="2x"/>
                                </NavIcon>
                                <NavText>
                                    즐겨찾기
                                </NavText>
                                <NavItem eventKey="bookMark/addBookmark">
                                    <NavIcon>
                                        <FontAwesomeIcon icon={faMapMarker} size="2x"/>
                                        <FontAwesomeIcon icon={faStar} size="sm"/>
                                    </NavIcon>
                                    <NavText>
                                        위치 즐겨찾기 추가
                                    </NavText>
                                </NavItem>
                                <NavItem>
                                    <NavIcon>
                                        <FontAwesomeIcon icon={faRoad} size="2x"/>
                                        <FontAwesomeIcon icon={faStar} size="sm"/>
                                    </NavIcon>
                                    <NavText>
                                        경로 즐겨찾기 추가
                                    </NavText>
                                </NavItem>
                                <NavItem>
                                    <NavIcon>
                                        <FontAwesomeIcon icon={faBuilding} size="2x"/>
                                        <FontAwesomeIcon icon={faStar} size="sm"/>
                                    </NavIcon>
                                    <NavText>
                                        건물 즐겨 찾기 추가
                                    </NavText>
                                </NavItem>
                            </NavItem>
                            <NavItem eventKey="addInfo">
                                <NavIcon>
                                    <FontAwesomeIcon icon={faMapMarker} size="2x"/>
                                </NavIcon>
                                <NavText>
                                    위치 추가
                                </NavText>
                                <NavItem eventKey="addInfo/point">
                                    <NavIcon>
                                        <FontAwesomeIcon icon={faMapMarker} size="2x"/>
                                    </NavIcon>
                                    <NavText>
                                        위치 추가하기
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="addInfo/direction">
                                    <NavIcon>
                                        <FontAwesomeIcon icon={faRoad} size="2x"/>
                                    </NavIcon>
                                    <NavText>
                                        경로 추가하기
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="addInfo/building">
                                    <NavIcon>
                                        <FontAwesomeIcon icon={faBuilding} size="2x"/>
                                    </NavIcon>
                                    <NavText>
                                        건물 약도 추가하기
                                    </NavText>
                                </NavItem>
                            </NavItem>
                            <NavItem eventKey="geo">
                                <NavIcon>
                                    <FontAwesomeIcon icon={faStreetView} size="2x"/>
                                </NavIcon>
                                <NavText>
                                    내 현재 위치 찾기
                                </NavText>
                            </NavItem>
                        </SideNav.Nav>
                    </SideNav>
                    <main>
                        <Route path={["/", "/home"]} exact component={MapPage}/>
                        <Route path={"/userInfo"} exact component={UserInfoPage}/>
                        <Route path={"/userInfo/post"} exact component={UserPostShowPage}/>
                        <Route path={"/userInfo/comment"} exact component={UserCommentShowPage}/>
                        <Route path={"/geo"} exact component={GeoPage}/>
                        <Route path={"/direction"} exact component={DirectionPage}/>
                        <Route path={"/login"} exact component={LoginPage}/>
                        <Route path={"/register"} exact component={RegisterPage}/>
                        <Route path={"/board"} exact component={BoardComponent}/>
                    </main>
                </React.Fragment>
            )}/>
        </StyledSideBar>

    );
};

export default SideBarContainter;
