import {Circle} from '@react-google-maps/api'
import React, {useState, useCallback} from "react";
import {Row, Col, Form, FormGroup, ListGroup} from 'react-bootstrap';
import InputBar from "../common/InputBar";

export const MapCircleInfo = ({onKeyPress, setRadius, radius}) => {
    const [input, setInput] = useState('');

    const onChange = useCallback(e => {
        setInput(e.target.value);
        return () => {
            setInput('');
        }
    }, [input]);

    const onRadiusChange = useCallback(e => {
        setRadius(e);
        return () => {
            setInput('');
        }
    },);

    return (
        <Row>
            <Form>
                <Form.Group as={Col} controlId="circleRadius">
                    <Form.Label>찾고 싶은 범위를 입력해주세요</Form.Label>
                    <Form.Control placeholder="찾고 싶은 범위를 입력해주세요" name={input}
                                  onChange={onChange} onKeyPress={onKeyPress}/>
                </Form.Group>
                <Form.Group as={Col} controlId="circleRadiusBar">
                    <InputBar onRadiusChange={onRadiusChange} radius={radius}/>
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
