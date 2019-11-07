import React, {useCallback, useEffect, useState} from 'react'
import {
    GoogleMap, LoadScript, DrawingManager, InfoWindow, DrawingManagerProps
    , Rectangle, InfoBox
} from '@react-google-maps/api'
import {Row, Col, Button, Container, Image, OverlayTrigger} from 'react-bootstrap';
import UserMarker from "../../components/map/UserMarker";
import MarkerInfo from "../../components/map/MarkerInfo";
import MapCircle, {MapCircleInfo} from "../../components/map/MapCircle";
import UserInfoInsertBox from "../../components/map/UserInfoInsertBox";
import UserPlaceContainer from "./UserPlaceContainer";
import {useSelector, useDispatch} from "react-redux";
import RectangleContainer from "./RectangleContainer";
import PopOverButton from "../../components/common/PopOverButton";
import UserInfoOnMapContainer from "./UserInfoOnMapContainer";

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
        const [infoInsertBox, setInsertInfoBox] = useState(null);
        const [photo, setPhoto] = useState(null);
        const [rectangle, setRectangle] = useState(null);
        const [leftUpperPoint, setleftUpperPoint] = useState(null);
        const [rightDownPoint, setRightDownPoint] = useState(null);
        const [userPlaceList, setUserPlaceList] = useState(null);
        const [userPosition, setUserPosition] = useState({lat: null, lng: null});
        const initialPosition = {lat: 37.284315, lng: 127.044504};

        const onMapClick = useCallback(e => {
            if (rectangle) {
                if (!leftUpperPoint) {
                    setleftUpperPoint({lat: e.latLng.lat(), lng: e.latLng.lng()});
                    return;
                }
                if (leftUpperPoint && !rightDownPoint) {
                    setRightDownPoint({lat: e.latLng.lat(), lng: e.latLng.lng()});
                    return;
                } else {
                    setRightDownPoint(null);
                    setleftUpperPoint(null);
                }
            }
             if(circle || infoInsertBox ){
                 addMarker(e);
             }
        },);

        const onInfoButtonClick = useCallback(() => {
              if(!infoBox) setInfoBox(true);
              else setInfoBox(false);
        });

        const onCircleButtonClick = useCallback(() => {
            if (!circle) setCircle(true);
            else setCircle(false);
        });

        const onInfoInsertButtonClick = useCallback(() => {
            if (!infoInsertBox) setInsertInfoBox(true);
            else setInsertInfoBox(false);
        });

        const onPhotoClick = useCallback(() => {
            if (!photo) setPhoto(true);
            else setPhoto(false);
        });

        const onUserPlaceListClick = useCallback(() => {
            if (!userPlaceList) setUserPlaceList(true);
            else setUserPlaceList(false);
        });

        const onRectangleClick = useCallback(() => {
            if (!rectangle) {
                setRectangle(true);
            } else setRectangle(false);
        }, [rectangle]);


        const addMarker = useCallback((e) => {
            setUserPosition({lat: e.latLng.lat(), lng: e.latLng.lng()});
        }, [userPosition]);

        const onKeyPress = useCallback(
            e => {
                if (e.key === 'Enter') {
                    console.dir(e);
                    e.preventDefault();
                    setRadius(parseInt(e.target.value, 10));
                }
            }, [radius]
        );

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
                            onClick={onMapClick}>
                            {circle && <MapCircle position={userPosition} radius={radius}/>}
                            {circle && <UserMarker position={userPosition}/>}
                            {infoInsertBox && <UserMarker position={userPosition}/>}
                            {leftUpperPoint && rightDownPoint && <RectangleContainer
                                leftUpper={leftUpperPoint} rightDown={rightDownPoint}/>}
                            {infoBox && <UserInfoOnMapContainer position={initialPosition}/>}
                        </GoogleMap>
                    </LoadScript>
                    <Button variant="outline-info" onClick={onInfoButtonClick}>유저 위치(지도)</Button>
                    <Button variant="outline-info" onClick={onCircleButtonClick}>일정 범위 조회</Button>
                    <Button variant="outline-info" onClick={onInfoInsertButtonClick}>유저 위치 추가</Button>
                    <Button variant="outline-info" onClick={onUserPlaceListClick}>유저 위치(리스트)</Button>
                    <Button variant="outline-info" onClick={onPhotoClick}>사진 테스트</Button>
                    <PopOverButton contentMessage="사각형을 그리기 위해 맵에서 사각형의 좌측 상단에 해당하는 부분을 클릭 후
                맵에서 사각형의 우측 하단에 해당하는 부분을 클릭해주세요"
                                   titleMessage="사각형 그리는 방법" ButtonLabel="구역 추가하기"
                                   onClick={onRectangleClick}/>

                </Col>

                <Col>
                    {marker && <MarkerInfo position={userPosition}/>}
                    {circle && <MapCircleInfo position={userPosition} onKeyPress={onKeyPress} setRadius={setRadius}/>}
                    {infoInsertBox && <UserInfoInsertBox position={userPosition} form={form}/>}
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
    }
;

export default MapContainer;
