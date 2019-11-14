import React, {useCallback, useEffect, useState} from 'react';
import {Button, Table} from 'react-bootstrap';
import MapSearchBox from "./MapSearchBox";
import {useDispatch, useSelector} from "react-redux";
import {setSearchQuery} from "../../modules/map";

const translatePrimary = (primaryPositionType) => {
    let translated;
    switch (primaryPositionType) {
        case "education":
            translated = "교육";
            break;
        case "excercise":
            translated = "운동";
            break;
        case "entertainment":
            translated = "오락";
            break;
        case "transport":
            translated = "교통";
            break;
        case "food":
            translated = "음식";
            break;
        default :
            translated = "없음";
    }

    return translated;
};

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

const LocalTable = ({dataList, searchQuery}) => {
        const [localDataList, setLocalDataList] = useState(dataList);

        useEffect(
            () => {
                console.dir(searchQuery);
                setLocalDataList(dataList.filter(data => (
                    data.name.indexOf(searchQuery)) !== -1 ? data : null));
            }, [searchQuery]);

        return (
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
                {localDataList.map(data => (<tr key={data._id}><LocalTableItem data={data}/></tr>))}
                </tbody>
            </Table>
        );
    }
;

const UserInfoViewer = ({info}) => {
    const [visible, setVisible] = useState(true);
    const [localSearchQuery, setLocalSearchQuery] = useState('');
    const dispatch = useDispatch();
    const {searchQuery} = useSelector(({map}) => ({
        searchQuery : map.searchQuery,
    }));

    useEffect(() =>{
        console.dir(searchQuery);
    }, [searchQuery]);

    const onSearchQuerySubmit = useCallback(
        () => {
            toggleVisible();
        }, [visible]);

    const toggleVisible = useCallback(() => {
        setVisible(false);
        setVisible(true);
    }, [visible]);

    return (
        <>
            <MapSearchBox onSearchQuerySubmit={onSearchQuerySubmit}/>
            { visible && <LocalTable dataList={info} searchQuery={searchQuery}/> }
        </>
    );
};

export default UserInfoViewer;
