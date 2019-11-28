import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import {Navbar, Nav, Button} from "react-bootstrap";

const StyledHeader = styled.div`
    padding-left: 60px;
`;

const Header = ({user, onLogout}) => {
    return (
        <StyledHeader>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/map">KONA 관리자 페이지</Navbar.Brand>
                <Nav className="mr-auto">
                    {user && <Nav.Link onClick={onLogout}>로그아웃</Nav.Link>}
                </Nav>
            </Navbar>
        </StyledHeader>
    );
};
export default Header;
