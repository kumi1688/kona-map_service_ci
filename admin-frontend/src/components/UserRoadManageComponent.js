import React from "react";
import {Button, Row, Table} from "react-bootstrap";


const UserRoadListItem = ({userRoad}) => {
    return(
        <tr align="middle">
            <td>{userRoad.name}</td>
            <td>{userRoad.description}</td>
            <td>{userRoad.detailedPosition}</td>
            <td>{userRoad.primaryPositionType}<br/>{userRoad.secondaryPositionType}</td>
            <td>{userRoad.tags.map((tag, index) => (<li key={index}>{tag}</li>))}</td>
            <td>{userRoad.publishingDate}</td>
            <td>{userRoad.username}</td>
            <td>{userRoad.block ? userRoad.block : 0}</td>
            <td><Button variant="danger">차단</Button></td>
        </tr>
    );
};


const UserRoadList = ({userRoadList}) => {
    return(
        <Table striped bordered hover variant="white">
            <thead>
            <tr align="center">
                <th className="table-warning">이름</th>
                <th className="table-warning">설명</th>
                <th className="table-warning">상세한 설명</th>
                <th className="table-warning">분류</th>
                <th className="table-warning">태그</th>
                <th className="table-warning">등록일</th>
                <th className="table-warning">등록자</th>
                <th className="table-warning">신고</th>
                <th className="table-warning">차단</th>
            </tr>
            </thead>
            <tbody>
            {userRoadList.map(road => (<UserRoadListItem key={road._id} userRoad={road}/>))}
            </tbody>
        </Table>
    )
};

const UserRoadManageComponent = ({userRoadList})=> {
    return ( <UserRoadList userRoadList={userRoadList}/> );
};

export default UserRoadManageComponent;
