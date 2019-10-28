import React, {useCallback, useState, useReducer} from 'react';
import {Col, Row, Button, Form, ListGroup} from 'react-bootstrap';
import {InfoBox} from '@react-google-maps/api';
import MapTagBox from "./MapTagBox";

const initialState = {
    name: '',
    description: '',
    gridPosition: {lat:null, lng:null},
    detailedPosition: '',
    tags: [],
};

const infoReducer = (state, action) => {
    switch (action.type) {
        case 'reset': {
            return initialState
        }
        case 'updateName': {
            return { ...state, name: action.name }
        }
        case 'updateDescription': {
            return { ...state, description: action.description }
        }
        case 'updateDetailedDescription': {
            return { ...state,  detailedPosition: action.detailedPosition }
        }
        case 'updateGridPosition': {
            return { ...state, gridPosition: {lat:action.gridPosition.lat, lng: action.gridPosition.lng}}
        }
        case 'updateTags': {
            console.dir(action.tags);
            return { ...state, tags: action.tags}
        }
        default: {
            throw new Error(`unexpected action.type: ${action.type}`)
        }
    }
};

const UserInfoBox = ({position}) => {
    const [info, dispatchInfo] = useReducer(infoReducer, initialState);

    const reset = () => dispatchInfo({ type: 'reset' });
    const updateName = (e) => dispatchInfo({ type: 'updateName', name: e.target.value });
    const updateDescription = e => dispatchInfo({ type: 'updateDescription', description: e.target.value });
    const updateDetailedDescription = e => dispatchInfo({ type: 'updateDetailedDescription', detailedPosition: e.target.value });
    const updateGridPosition = position => dispatchInfo({ type: 'updateGridPosition', gridPosition: position});
    const updateTags = newtag => dispatchInfo({type: 'updateTags', tags: newtag});

    const onSubmit= useCallback(
        e => {
            e.preventDefault();
            updateGridPosition(position);
            console.dir(info);
        }
    );

    return(
        <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="name" >
                    <Form.Label>이름</Form.Label>
                    <Form.Control placeholder="이름을 입력해주세요" onChange={updateName}/>
                </Form.Group>

                <Form.Group as={Col} controlId="description">
                    <Form.Label>설명</Form.Label>
                    <Form.Control placeholder="설명을 입력해주세요" name="description"
                    onChange={updateDescription}/>
                </Form.Group>
            </Form.Row>

            <Form.Group controlId="gridPosition" >
                <Form.Label>위치(지도 클릭)</Form.Label>
                <ListGroup>
                    <ListGroup.Item>위도 : {position.lat}</ListGroup.Item>
                    <ListGroup.Item>경도 : {position.lng}</ListGroup.Item>
                </ListGroup>
            </Form.Group>

            <Form.Group controlId="detailedPosition">
                <Form.Label>세부 위치</Form.Label>
                <Form.Control placeholder="ex) 팔달관 근처, 도서관 정문 앞" name="detailedDescription"
                              onChange={updateDetailedDescription}/>
            </Form.Group>

            <MapTagBox updateTags={updateTags}/>

            <Button variant="primary" type="submit" onClick={onSubmit}>등록</Button>
        </Form>
    );
};

export default UserInfoBox;
