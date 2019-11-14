import React from 'react';
import styled from 'styled-components';
import Responsive from "./Responsive";
import {Link} from 'react-router-dom';
import Button from "./Button";
import {Navbar, Nav, Form, FormControl} from "react-bootstrap";
import UserInfoOnMapContainer from "../../containers/map/UserInfoOnMapContainer";


const UserInfo = styled.div`
    font-weight: 800;
    margin-right: 1rem;
    
`;

const HeaderBlock = styled.div`
      position: fixed;
      z-index : 30;
      width: 100%;
      background: white;
      box-shadow: 0px 2px 4px rgba(0,0,0,0.08);
    `;

const Wrapper = styled(Responsive)`
    height: 4rem;
    display: flex;
    z-index : 30;
    align-items: center;
    justify-content : space-between;
    .logo{
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
    }
    .right{
    display:flex;
    align-items: center;
    }
`;

const Spacer = styled.div`
height: 4rem;
`;

const Header = ({user, onLogout}) => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/map">KONA MAP SERVICE</Navbar.Brand>
                <Nav className="mr-auto">
                    {user && <Nav.Link href="/userInfo">유저 정보</Nav.Link>}
                    {user && <Nav.Link onClick={onLogout}>로그아웃</Nav.Link>}
                    {!user && <Nav.Link href="/login">로그인</Nav.Link>}
                </Nav>
                <Form inline>
                    <Form.Group>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                        <Form.Control as="select">
                            <option>이름</option>
                            <option>태그</option>
                            <option>설명</option>
                            <option>위치</option>
                        </Form.Control>
                        <Button variant="outline-info" size="sm" block>검색</Button>
                    </Form.Group>
                </Form>
            </Navbar>
        </>
    );
};

/*
        <>
            <HeaderBlock>
                <Wrapper>
                    <Link to="/map" className="logo">KONA MAP SERVICE</Link>
                    {user ?
                        ( <div className="right">
                            <UserInfo>{user.username}</UserInfo>
                                <Button to='/userInfo'>유저정보</Button>
                            <Button onClick={onLogout}>로그아웃</Button>
                        </div>
                        ):
                        ( <div className="right">
                                <Button to="/login">로그인</Button>
                            </div>
                        )}
                </Wrapper>
            </HeaderBlock>
            <Spacer/>
        </>
        */

export default Header;

