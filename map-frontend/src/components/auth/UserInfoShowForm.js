import React, {useEffect} from 'react';
import {Table} from 'react-bootstrap';
import styled from "styled-components";

const TableStyle = styled.div`
    padding-left: 60px;
`;

const UserInfoShowForm = ({userInfo}) => {
    useEffect(() =>{
        console.dir(userInfo);
    }, [userInfo]);
    return(
        <TableStyle>
            <Table striped bordered hover variant="dark" >
                <thead>
                <tr>
                    <th>아이디</th>
                    <th>사는 곳</th>
                    <th>나이</th>
                    <th>성별</th>
                    <th>직업</th>
                    <th>바라는 것</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{userInfo.username}</td>
                    <td>{userInfo.livingArea}</td>
                    <td>{userInfo.age}</td>
                    <td>{userInfo.gender}</td>
                    <td>{userInfo.job}</td>
                    <td>
                        <ul>
                            {userInfo.wanted.map((info,index) => (<li key={index}>{info}</li>))}
                        </ul>
                    </td>
                </tr>
                </tbody>
            </Table>
        </TableStyle>
    )
};

export default UserInfoShowForm;
