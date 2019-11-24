import React, {useState, useCallback} from 'react';
import MapTagBox from "./MapTagBox";
import {Form, Col, Button} from 'react-bootstrap';

const MarkerInfo = ({position}) => {
    const [input, setInput] = useState('');
    const [markerInfo, setMarkerInfo] = useState({
        name: null,
        description: null,
        tags: [],
        position: {lat: null, lng: null},
    });

    const onSubmit = useCallback(
        e => {
            e.preventDefault();
            setMarkerInfo({
                name: e.target[0].value,
                description: e.target[1].value,
                position: {lat: position.lat, lng: position.lng},
            });
            console.dir(markerInfo);
        }, [markerInfo]
    );

    const onChange = useCallback(
        e => {
            setInput(e.target.value);
        }, []
    );


    return (
        <div>
            <>
                <h2> 위도 : {position.lat} </h2>
                <h2> 경도 : {position.lng} </h2>
                <Form onSubmit={onSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="userPlaceName">
                            <Form.Label>위치 이름</Form.Label>
                            <Form.Control type="text" placeholder="위치의 이름을 입력해주세요"/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="userPlaceDescription">
                            <Form.Label>위치 설명</Form.Label>
                            <Form.Control type="email" placeholder="위치에 대한 설명을 입력해주세요"/>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </>
            <MapTagBox/>
            <Button variant="outline-info" onClick={onSubmit}>제출</Button>
        </div>
    );
};

export default MarkerInfo;
