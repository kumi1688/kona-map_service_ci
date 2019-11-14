import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import Responsive from "./Responsive";
import {Link} from 'react-router-dom';
import Button from "./Button";
import {Navbar, Nav, Form, FormControl} from "react-bootstrap";
import UserInfoOnMapContainer from "../../containers/map/UserInfoOnMapContainer";
import {useDispatch, useSelector} from "react-redux";
import {setSearchQuery} from "../../modules/map";


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
    const dispatch = useDispatch();
    const {searchQueryOnMap} = useSelector(({map}) => ({
        searchQueryOnMap: map.searchQuery.searchQueryOnMap
    }));

    const [value, setValue] = useState('');
    const [option, setOption] = useState('name');

    const onChangeSearchQuery = useCallback(
        e => {
            setValue(e.target.value);
        }, [value]);

    const onChangeSearchOption = useCallback(
        e => {
            setOption(e.target.value);
        }, [option]);

    const onSubmit = useCallback(
        e => {
            e.preventDefault();
            dispatch(setSearchQuery({
                searchQuery: value,
                searchQueryType: option,
                searchQueryOnMap: true
                }));
        }, [dispatch, value, option]);

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
                        <FormControl type="text" placeholder="Search" className="mr-sm-2"
                        value={value} onChange={onChangeSearchQuery}/>
                        <Form.Control as="select" value={option} onChange={onChangeSearchOption}>
                            <option value="name">이름</option>
                            <option value="tag">태그</option>
                            <option value="description">설명</option>
                            <option value="position">위치</option>
                        </Form.Control>
                        <Button variant="outline-info" size="lg"
                        onSubmit={onSubmit} onClick={onSubmit}>검색</Button>
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

