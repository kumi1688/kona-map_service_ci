import {Circle} from '@react-google-maps/api'
import React, {useState, useCallback} from "react";
import {Row, Col, Form} from 'react-bootstrap';
import InputBar from "../common/InputBar";
import styled from "styled-components";

const StyledCircleWrapper = styled.div`
    z-index : 20;
    background-color : white;
    position: fixed;
    right: 0;
    margin : 20px 20px 20px 20px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    border : dashed black;
`;

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
        <StyledCircleWrapper>
            <Row>
                <Form >
                    <Form.Group as={Col} controlId="circleRadius" >
                        <Form.Control placeholder="범위 입력" name={input}
                                      onChange={onChange} onKeyPress={onKeyPress}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="circleRadiusBar">
                        <InputBar onRadiusChange={onRadiusChange} radius={radius}/>
                    </Form.Group>
                </Form>
            </Row>
        </StyledCircleWrapper>
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
