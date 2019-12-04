import React from 'react';
import {Form, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import YoutubeContainer from "../common/YoutubeContainer";

const getPrimaryPosition = (position) => {
    switch (position) {
        case "excercise":
            return '운동';
        case "education":
            return '교육';
        case 'entertainment' :
            return '오락';
        case "food":
            return '음식';
        case "transport" :
            return '교통';
        case "restPlace":
            return "숙소";
        case "hospital" :
            return "병원";
        case "convenience" :
            return "편의시설";
        case "hairshop" :
            return "미용시설";
        default :
            return "없음";
    }
};

const BasicInfoViewerContainer = ({info}) => {
    return(
        <Form>
            <Form.Group as={Row}>
                <Form.Label column  sm="4" style={{textAlign: "center"}}>
                    이름
                </Form.Label>
                <ListGroup.Item>{info.name}</ListGroup.Item>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="4" style={{textAlign: "center"}}>
                    설명
                </Form.Label>
                <ListGroup.Item>{info.description}</ListGroup.Item>
            </Form.Group>
            <Form.Group as={Row} style={{textAlign: "center"}}>
                <Form.Label column  sm="4">
                    위치 타입
                </Form.Label>
                <ListGroup.Item>{getPrimaryPosition(info.primaryPositionType)}</ListGroup.Item>
                <ListGroup.Item>{info.secondaryPositionType}</ListGroup.Item>
            </Form.Group>
            <Form.Group as={Row} style={{textAlign: "center"}}>
                <Form.Label column sm="4">
                    태그
                </Form.Label>
                {info.tags.map((tag, index) => (
                    <ListGroupItem key={index}>#{tag}</ListGroupItem>))}
            </Form.Group>
            {info.radius &&
            <h3>{info.radius === undefined ? "반경 없음" : `반경 ${info.radius} m`}</h3>}
            <p>등록일 : {info.publishingDate}</p>
        </Form>
    );
};

export default BasicInfoViewerContainer;
