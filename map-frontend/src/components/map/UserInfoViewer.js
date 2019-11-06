import React, {useState} from 'react';
import {Button, Table} from 'react-bootstrap';

const LocalTableItem = ({data}) => (
    <>
        <td>{data.name}</td>
        <td>{data.description}</td>
        <td></td>
        <td>{data.position.lat}<br/>{data.position.lng}</td>
        <td>{data.publishingDate}</td>
        <td>{data.tags.map((tag, index) => <li key={index}>{tag}</li>)}</td>
    </>
);

const LocalTable = ({dataList}) => (
    <Table striped bordered hover variant="dark">
        <thead>
        <tr>
            <th>이름</th>
            <th>설명</th>
            <th>상세한 설명</th>
            <th>위치</th>
            <th>등록일</th>
            <th>태그</th>
        </tr>
        </thead>
        <tbody>
        {dataList.map(data => (<tr key={data._id}><LocalTableItem data={data}/></tr>))}
        </tbody>
    </Table>
);

const UserInfoViewer = ({info, loading}) => {
    const [visible, setVisible] = useState(false);
    const onClick = () => {
        console.dir(info);
        if (!visible) setVisible(true);
        else setVisible(false);
    };

    return (
        <>
            {visible && (<LocalTable dataList={info}/>)}
            <Button variant="outline-primary" onClick={onClick}>불러오기</Button>
        </>
    );
};

export default UserInfoViewer;
