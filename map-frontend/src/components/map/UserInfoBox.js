import React, {useCallback, useState, useReducer, useEffect} from 'react';
import {Col, Row, Button, Form, ListGroup} from 'react-bootstrap';
import MapTagBox from "./MapTagBox";
import client from "../../lib/api/client";
import {post} from '../../modules/map';
import {useDispatch, useSelector} from "react-redux";
import ImageUpload from "../common/ImageUpload";
import BootStrapModal from "../common/BootStrapModal";

const initialState = {
    name: '',
    description: '',
    gridPosition: {lat:0, lng:0},
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
        case 'updateDetailedPosition': {
            console.dir(action.detailedPosition);
            return { ...state,  detailedPosition: action.detailedPosition }
        }
        case 'updateGridPosition': {
            return { ...state, gridPosition: {lat: parseFloat(action.gridPosition.lat),
                    lng: parseFloat(action.gridPosition.lng)}}
        }
        case 'updateTags': {
            return { ...state, tags: action.tags}
        }
        default: {
            throw new Error(`unexpected action.type: ${action.type}`)
        }
    }
};

const UserInfoBox = ({position, form}) => {
    const [localInfo, setLocalInfo] = useReducer(infoReducer, initialState);

    const reset = () => setLocalInfo({ type: 'reset' });
    const updateName = (e) => setLocalInfo({ type: 'updateName', name: e.target.value });
    const updateDescription = e => setLocalInfo({ type: 'updateDescription', description: e.target.value });
    const updateDetailedDescription = e => setLocalInfo({ type: 'updateDetailedPosition', detailedPosition: e.target.value });
    const updateGridPosition = position => setLocalInfo({ type: 'updateGridPosition',
        gridPosition: position});
    const updateTags = newtag => setLocalInfo({type: 'updateTags', tags: newtag});

    useEffect( ( ) => {
        updateGridPosition(position);
    },[position]);

    const onSubmit= useCallback(
        e => {
            e.preventDefault();
            //updateGridPosition(position);
            console.dir(localInfo);

                const saveData = async () => {
                    await client.post('/api/map', ({
                            name: localInfo.name,
                            description: localInfo.description,
                            position: localInfo.gridPosition,
                            tags: localInfo.tags,
                            detailedPosition: localInfo.detailedPosition,
                    }));
                };
                saveData();

        }, [localInfo, position]
    );

    return(
        <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="name" >
                    <Form.Label>이름</Form.Label>
                    <Form.Control placeholder="이름을 입력해주세요" name="updateName" onChange={updateName}/>
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

            <Form.Group controlId="photo">
                <Form.Label>사진</Form.Label>
                <ImageUpload/>
            </Form.Group>

            <MapTagBox updateTags={updateTags}/>

            {/*<Button variant="primary" type="submit" onClick={onSubmit}>등록</Button>*/}
            <BootStrapModal text="정말 등록하시겠습니까?" info={localInfo} onSubmit={onSubmit}/>
        </Form>
    );
};

export default UserInfoBox;
