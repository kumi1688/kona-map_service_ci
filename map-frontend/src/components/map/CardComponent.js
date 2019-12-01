import {Card, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import React from "react";
import {polylineOptions} from "./RoadColor";

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

const getImage = (info) => {
    if(info.imageUrl) return info.imageUrl;
    if(info.name.indexOf('카페') !== -1 ){
        return 'https://capstonbucket.s3.ap-northeast-2.amazonaws.com/image/%EC%95%84%EC%A3%BC%EB%8C%80+%EC%B9%B4%ED%8E%98.jpg';
    }
    if(info.name.indexOf('pc방') !== -1) {
        return 'https://capstonbucket.s3.ap-northeast-2.amazonaws.com/image/pc%EB%B0%A9.jpg';
    }
    if(info.name.indexOf('당구장') !== -1) {
        return 'https://capstonbucket.s3.ap-northeast-2.amazonaws.com/image/%EB%8B%B9%EA%B5%AC%EC%9E%A5.jpg';
    }

    if(info.name.indexOf('흡연장') !== -1 ){
        return 'https://capstonbucket.s3.ap-northeast-2.amazonaws.com/image/%ED%9D%A1%EC%97%B0%EC%9E%A51.jpg';
    }
    if(info.name.indexOf('올라가는 길') !== -1){
        return 'https://capstonbucket.s3.ap-northeast-2.amazonaws.com/image/%ED%8C%94%EB%8B%AC%EA%B4%801.jpg';
    }
    switch(info.primaryPositionType) {
        case "excercise": return 'https://capstonbucket.s3.ap-northeast-2.amazonaws.com/image/excercise.jpg';
        case "education": return 'https://capstonbucket.s3.ap-northeast-2.amazonaws.com/image/education.jpg';
        case 'entertainment' : return 'https://capstonbucket.s3.ap-northeast-2.amazonaws.com/image/amusement.jpg';
        case "food": return 'https://capstonbucket.s3.ap-northeast-2.amazonaws.com/image/food.jpg';
        case "transport" : return 'https://capstonbucket.s3.ap-northeast-2.amazonaws.com/image/transport.jpg';
        case "restPlace": return 'https://capstonbucket.s3.ap-northeast-2.amazonaws.com/image/restPlace.jpg';
        case "hospital" : return 'https://capstonbucket.s3.ap-northeast-2.amazonaws.com/image/hospital.jpg';
        case "convenience" : return 'https://capstonbucket.s3.ap-northeast-2.amazonaws.com/image/convenience.jpg';
        case "hairshop" : return 'https://capstonbucket.s3.ap-northeast-2.amazonaws.com/image/hairshop.jpg';
        case "mainRoad" : return 'https://capstonbucket.s3.ap-northeast-2.amazonaws.com/image/mainroad.jpg';
        case "smallRoad" : return 'https://capstonbucket.s3.ap-northeast-2.amazonaws.com/image/smallroad.jpg';
        case "travelRoad": return 'https://capstonbucket.s3.ap-northeast-2.amazonaws.com/image/travelroad.jpg';
        case "foodRoad": return 'https://capstonbucket.s3.ap-northeast-2.amazonaws.com/image/foodroad.jpg';
        case "sightSeeingRoad": return 'https://capstonbucket.s3.ap-northeast-2.amazonaws.com/image/sightseeingroad.jpg'
        default : return 'https://capstonbucket.s3.ap-northeast-2.amazonaws.com/image/wiki.jpg';
    }
};

const CardComponent = ({info}) => {
    return (
        <Row>
            <Card style={{width: '20rem', height: '20rem'}}>
                <Card.Img variant="top" alt="Card image"
                          src={getImage(info)}/>
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
