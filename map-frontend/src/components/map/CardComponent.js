import {Card, ListGroup, ListGroupItem, Row,Carousel} from "react-bootstrap";
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
            <Carousel style={{width: '20rem', height: '20rem'}}>
                {info.imageUrl ? info.imageUrl.map(url => (
                    <Carousel.Item key={url}>
                        <img
                            key={url}
                            className="d-block w-100"
                            src={url}
                            alt="Third slide"
                        />
                    </Carousel.Item>)) : null}
            </Carousel>

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
