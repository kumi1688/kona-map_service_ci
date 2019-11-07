import {Circle} from '@react-google-maps/api'
import React, {useState, useCallback} from "react";
import {Row, Col, Form, FormGroup, ListGroup} from 'react-bootstrap';
import InputBar from "../common/InputBar";

export const MapCircleInfo = ( {position, onKeyPress, setRadius}) => {
    const [input, setInput] = useState('');

    const onChange = useCallback(e => {
        setInput(e.target.value);
        console.dir(input);
        return () =>{
            setInput('');
        }
    }, );

    const onRadiusChange = useCallback(e => {
        setRadius(e);
       return () => {
           setInput('');
       }
    });

    return (
        <Row>
            <ListGroup> 찾고 싶은 곳을 클릭하세요
                <ListGroup.Item>위도 : {position.lat}</ListGroup.Item>
                <ListGroup.Item>경도 : {position.lng}</ListGroup.Item>
            </ListGroup>
            <Form>
                <Form.Group as={Col} controlId="circleRadius" >
                    <Form.Label>찾고 싶은 범위를 입력해주세요</Form.Label>
                    <Form.Control placeholder="찾고 싶은 범위를 입력해주세요" name={input}
                                  onChange={onChange} onKeyPress={onKeyPress}/>
                </Form.Group>

                <Form.Group as={Col} controlId="circleRadiusBar" >
                    <InputBar onRadiusChange={onRadiusChange}/>
                </Form.Group>
            </Form>
        </Row>
    );
};

const MapCircle = ({position, radius}) => {
    return (
        <Col>
            <Circle
                // required
                center={position}
                // required
                options={{
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#9fff51',
                    fillOpacity: 0.35,
                    clickable: false,
                    draggable: false,
                    editable: false,
                    visible: true,
                    radius: radius,
                    zIndex: 1
                }}
            />
        </Col>
    );
};

export default MapCircle;
