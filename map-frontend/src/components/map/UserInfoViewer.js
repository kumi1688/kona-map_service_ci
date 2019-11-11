import React, {useEffect, useState} from 'react';
import {Button, Table} from 'react-bootstrap';

const translatePrimary = (primaryPositionType) => {
    let translated;
    switch(primaryPositionType){
        case "education": translated = "교육"; break;
        case "excercise": translated = "운동"; break;
        case "entertainment": translated = "오락"; break;
        case "transport": translated = "교통"; break;
        case "food": translated = "음식"; break;
        default : translated = "없음";
    }

    return translated;
}

const LocalTableItem = ({data}) => (
    <>
        <td>{data.name}</td>
        <td>{data.description}</td>
        <td>{data.detailedPosition}</td>
        <td>{data.position.lat}<br/>{data.position.lng}</td>
        <td>{data.publishingDate}</td>
        <td>{data.tags.map((tag, index) => <li key={index}>{tag}</li>)}</td>
        <td>{translatePrimary(data.primaryPositionType)}<br/>{data.secondaryPositionType}</td>
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
            <th>위치타입</th>
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

    useEffect(()=>{
        console.dir(info);
    });

    return (
        <>
            {visible && (<LocalTable dataList={info}/>)}
            <Button variant="outline-primary" onClick={onClick}>불러오기</Button>
        </>
    );
};

export default UserInfoViewer;
