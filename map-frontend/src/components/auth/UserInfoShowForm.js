import React from 'react';
import {Table} from 'react-bootstrap';

const UserInfoShowForm = ({userInfo, onLoad}) => {
    console.dir(userInfo);
    return(
        <>
            <Table striped bordered hover variant="dark" onLoad={onLoad}>
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
                            {userInfo.wanted.map(info => (<li key={info.index}>{info}</li>))}
                        </ul>
                    </td>
                </tr>
                </tbody>
            </Table>
        </>
    )
};

export default UserInfoShowForm;
