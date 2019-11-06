import React, {useCallback, useEffect, useState} from 'react'
import {GoogleMap, LoadScript, DrawingManager, InfoWindow, DrawingManagerProps
        , Rectangle} from '@react-google-maps/api'
import {Row, Col, Button, Container, Image} from 'react-bootstrap';
import UserMarker from "../../components/map/UserMarker";
import MarkerInfo from "../../components/map/MarkerInfo";
import MapCircle, {MapCircleInfo} from "../../components/map/MapCircle";
import UserInfoBox from "../../components/map/UserInfoBox";
import UserPlaceContainer from "./UserPlaceContainer";
import {useSelector, useDispatch} from "react-redux";
import {changeField} from "../../modules/auth";

const MapContainer = () => {
    const dispatch = useDispatch();
    const {loading, form} = useSelector(({map, loading}) => ({
        loading: loading,
        form: map.info,
    }));

    const [marker, setMarker] = useState(null);
    const [circle, setCircle] = useState(null);
    const [radius, setRadius] = useState(null);
    const [infoBox, setInfoBox] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [rectangle, setRectangle] = useState(null);
    const [userPlaceList, setUserPlaceList] = useState(null);
    const initialPosition = {lat: 37.284315, lng: 127.044504};
    const [userPosition, setUserPosition] = useState({lat: null, lng: null});

    const onMarkerButtonClick = () => {
        if (!marker) setMarker(true);
        else setMarker(false);
    };

    const onCircleButtonClick = () => {
        if (!circle) setCircle(true);
        else setCircle(false);
    };

    const onInfoButtonClick = () => {
        if (!infoBox) setInfoBox(true);
        else setInfoBox(false);
    };

    const onPhotoClick = () => {
        if (!photo) setPhoto(true);
        else setPhoto(false);
    };

    const onUserPlaceListClick = () => {
        if (!userPlaceList) setUserPlaceList(true);
        else setUserPlaceList(false);
    };

    const onRectangleClick = () => {
        if(!rectangle) setRectangle(true);
        else setRectangle(false);
    };

    const addMarker = (e) => {
        setUserPosition({lat: e.latLng.lat(), lng: e.latLng.lng()});
    };

    const onKeyPress = useCallback(
        e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                setRadius(parseInt(e.target.value, 10));
            }
        }, [radius]
    );

    // 인풋 변경 이벤트 핸들러
    const onFormChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'userPlace',
                key: name,
                value,
            }),
        );
    };

    useEffect( () => {
        console.dir(form);
    }, []);

    return (
        <Row>
            <Col>
                <LoadScript
                    id="script-loader"
                    googleMapsApiKey="AIzaSyBoLaZLcIzTtGb0Ogg23GTiPkuXs0R-JwE">
                    <GoogleMap
                        mapContainerStyle={{
                            height: '400px',
                            width: '700px'
                        }}
                        zoom={15}
                        center={initialPosition}
                        onClick={addMarker}>
                        <Rectangle bounds={{
                            // 37.284315, lng: 127.044504
                            north: 37.290,
                            south: 37.275,
                            east: 127.050,
                            west: 127.040,
                        }} editable={true}
                        draggable={true}
                        visible={rectangle}/>
                        {marker && <UserMarker position={userPosition}/>}
                        {circle && <MapCircle position={userPosition} radius={radius}/>}
                        {circle && <UserMarker position={userPosition}/>}
                        {infoBox && <UserMarker position={userPosition}/>}
                    </GoogleMap>
                </LoadScript>
                <Button variant="outline-info" onClick={onMarkerButtonClick}>마커 추가</Button>
                <Button variant="outline-info" onClick={onCircleButtonClick}>일정 범위 조회</Button>
                <Button variant="outline-info" onClick={onInfoButtonClick}>유저 위치 추가</Button>
                <Button variant="outline-info" onClick={onUserPlaceListClick}>유저 위치 리스트</Button>
                <Button variant="outline-info" onClick={onRectangleClick}>구역 지정</Button>
                <Button variant="outline-info" onClick={onPhotoClick}>사진 테스트</Button>
            </Col>

            <Col>
                {marker && <MarkerInfo position={userPosition}/>}
                {circle && <MapCircleInfo position={userPosition} onKeyPress={onKeyPress}/>}
                {infoBox && <UserInfoBox position={userPosition} form={form}/>}
                {photo && (
                    <Container>
                        <Row>
                            <Col xs={6} md={4}>
                                <Image src="https://mdbootstrap.com/img/Others/documentation/1.jpg" rounded/>
                            </Col>
                        </Row>
                    </Container>
                )}
                {userPlaceList && <UserPlaceContainer/>}
            </Col>
        </Row>
    );
};

export default MapContainer;
