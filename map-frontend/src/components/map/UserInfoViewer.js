import React, {useState} from 'react';
import {Button, Table} from 'react-bootstrap';

const LocalTableItem = ({data}) => (
    <>
        <td>{data.name}</td>
        <td>{data.description}</td>
        <td>위도 : {data.position.lat} 경도 : {data.position.lng}</td>
        <td>{data.publishingDate}</td>
        <td>{data.tags.map((tag, index) => <li key={index}>{tag}</li>)}</td>
    </>
);

const LocalTable = ({dataList}) => (
    <Table striped bordered hover variant="dark" >
        <thead>
        <tr>
            <th>이름</th>
            <th>설명</th>
            <th>위치</th>
            <th>등록일</th>
            <th>태그</th>
        </tr>
        </thead>
        <tbody>
        {dataList.map(data => (<tr key={data._id}><LocalTableItem data={data}/></tr>))}
        {/*
        <tr>
            <td>{dataList.name}</td>
            <td>{dataList.description}</td>
            <td>{dataList.position.lat}, {dataList.position.lng}</td>
            <td>{dataList.publishingDate}</td>
            <td>
                <ul>
                    {dataList.tags.map((tag, index) => (<li key={index}>{tag}</li>))}
                </ul>
            </td>
        </tr>
        */}
        </tbody>
    </Table>
);

const UserInfoViewer = ({info, loading}) => {
    const [visible, setVisible] = useState(false);
    const onClick = () => {
        console.dir(info);
        if(!visible) setVisible(true);
        else setVisible(false);
    };

    return (
        <>
            {visible && (<Table><LocalTable dataList={info}/></Table>)}
            <Button variant="outline-primary" onClick={onClick}>불러오기</Button>
        </>
    );
};

export default UserInfoViewer;
