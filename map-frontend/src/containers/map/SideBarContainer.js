import React from 'react';
import MapPage from "../../pages/MapPage";
import UserInfoPage from "../../pages/UserInfoPage";
import SideNav, {Toggle, Nav, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import {Router, Route} from 'react-router-dom';
import {
    faHome,
    faStar,
    faMapMarker,
    faMapPin,
    faRoad,
    faMap, faUser, faAddressCard, faEdit, faComment
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import styled from "styled-components";
import UserCommentShowPage from "../../pages/UserCommentShowPage";

const StyledSideBar = styled.div`
    height: '100%';
`;

const SideBarContainter = ({history}) => {
    return (
        <StyledSideBar>
            <Route render={({history}) => (
                <React.Fragment>
                    <SideNav
                        onSelect={(selected) => {
                            const to = '/' + selected;
                            console.dir(to);
                            history.push(to);
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

                                <NavItem eventKey="userInfo/userPlace">
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
                            <NavItem>
                                <NavIcon>
                                    <FontAwesomeIcon icon={faStar} size="2x"/>
                                </NavIcon>
                                <NavText>
                                    즐겨찾기
                                </NavText>
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
                                        <FontAwesomeIcon icon={faMapPin} size="2x"/>
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
                                        <FontAwesomeIcon icon={faMap} size="2x"/>
                                    </NavIcon>
                                    <NavText>
                                        건물 약도 추가하기
                                    </NavText>
                                </NavItem>
                            </NavItem>
                        </SideNav.Nav>
                    </SideNav>
                    <main>
                        <Route path={["/", "/home"]} exact component={MapPage}/>
                        <Route path={"/userInfo"} exact component={UserInfoPage}/>
                        <Route path={"/userInfo/comment"} exact component={UserCommentShowPage}/>
                    </main>
                </React.Fragment>
            )}/>
        </StyledSideBar>

    );
};

export default SideBarContainter;
