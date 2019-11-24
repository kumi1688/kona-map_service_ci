import {Card, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import React from "react";

const getPrimaryPosition = (position) => {
    switch(position){
        case "excercise": return '운동';
        case "education": return '교육';
        case 'entertainment' : return '오락';
        case "food": return '음식';
        case "transport" : return '교통';
        case "restPlace": return "숙소";
        case "hospital" : return "병원";
        case "convenience" : return "편의시설";
        case "hairshop" : return "미용시설";
        default : return "없음";
    }
};

const CardComponent = ({info}) => {

    return (
        <Row>
            <Card style={{width: '20rem', height: '25rem'}}>
                <Card.Img variant="top" alt="Card image"
                          src="https://capstonbucket.s3.ap-northeast-2.amazonaws.com/image/%ED%8C%94%EB%8B%AC%EA%B4%801.jpg"/>
            </Card>

            <Card style={{width: '20rem', height: '15rem'}}>
                <Card.Body>
                    <Card.Title>{info.name}</Card.Title>
                    <Card.Text>
                        {info.description}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <Row style={{paddingLeft : '5rem'}}>
                        <ListGroupItem>{getPrimaryPosition(info.primaryPositionType)}</ListGroupItem>
                        <ListGroupItem>{info.secondaryPositionType}</ListGroupItem>
                    </Row>
                    {info.tags.map((tag, index) => (<ListGroupItem key={index}>{tag}</ListGroupItem>))}
                </ListGroup>
            </Card>

        </Row>
    );
};

export default CardComponent;
