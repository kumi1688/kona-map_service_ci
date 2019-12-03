import React from "react";
import {Button, Row, Table} from "react-bootstrap";


const UserPlaceListItem = ({userPlace}) => {
    return(
        <tr align="middle">
            <td>{userPlace.name}</td>
            <td>{userPlace.description}</td>
            <td>{userPlace.detailedPosition}</td>
            <td>{userPlace.position.lat}<br/>{userPlace.position.lng}</td>
            <td>{userPlace.primaryPositionType}<br/>{userPlace.secondaryPositionType}</td>
            <td>{userPlace.tags.map((tag, index) => <li key={index}>{tag}</li>)}</td>
            <td>{userPlace.publishingDate}</td>
            <td>{userPlace.username}</td>
            <td>{userPlace.block ? userPlace.block : 0}</td>
            <td><Button variant="danger">차단</Button></td>
        </tr>
    );
};


const UserPlaceList = ({userPlaceList}) => {
    return(
        <Table striped bordered hover variant="white">
            <thead>
            <tr align="center">
                <th className="table-warning">이름</th>
                <th className="table-warning">설명</th>
                <th className="table-warning">상세한 설명</th>
                <th className="table-warning">위치</th>
                <th className="table-warning">분류</th>
                <th className="table-warning">태그</th>
                <th className="table-warning">등록일</th>
                <th className="table-warning">등록자 이름</th>
                <th className="table-warning">신고</th>
                <th className="table-warning">차단</th>
            </tr>
            </thead>
            <tbody>
            {userPlaceList.map(place => (<UserPlaceListItem key={place._id} userPlace={place}/>))}
            </tbody>
        </Table>
    )
};

const UserPlaceManageComponent = ({userPlaceList})=> {
    return ( <UserPlaceList userPlaceList={userPlaceList}/> );
};

export default UserPlaceManageComponent;
