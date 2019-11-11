import React, {useCallback, useEffect, useState} from 'react'
import {GoogleMap, InfoWindow, LoadScript, StandaloneSearchBox} from '@react-google-maps/api'
import {Row, Col, Button, Container, Image} from 'react-bootstrap';
import UserMarker from "../../components/map/UserMarker";
import MarkerInfo from "../../components/map/MarkerInfo";
import MapCircle, {MapCircleInfo} from "../../components/map/MapCircle";
import UserInfoInsertBox from "../../components/map/UserInfoInsertBox";
import UserPlaceContainer from "./UserPlaceContainer";
import {useSelector, useDispatch} from "react-redux";
import RectangleContainer from "./RectangleContainer";
import PopOverButton from "../../components/common/PopOverButton";
import UserInfoOnMapContainer from "./UserInfoOnMapContainer";
import {GiSoccerBall} from 'react-icons/gi';


const MapContainer = () => {
        const dispatch = useDispatch();
        const {loading, form} = useSelector(({map, loading}) => ({
            loading: loading,
            form: map.info,
        }));

        const [zoom, setZoom] = useState(15);
        const [marker, setMarker] = useState(null);
        const [circle, setCircle] = useState(null);
        const [radius, setRadius] = useState(null);
        const [infoBox, setInfoBox] = useState(null);
        const [insertInfoBox, setInsertInfoBox] = useState(null);
        const [rectangle, setRectangle] = useState(null);
        const [leftUpperPoint, setLeftUpperPoint] = useState(null);
        const [rightDownPoint, setRightDownPoint] = useState(null);
        const [userPlaceList, setUserPlaceList] = useState(null);
        const [userPosition, setUserPosition] = useState({lat: null, lng: null});

        const initialPosition = {lat: 37.284315, lng: 127.044504};

        const onMapClick = useCallback(e => {
            if (rectangle) {
                if (!leftUpperPoint) {
                    setLeftUpperPoint({lat: e.latLng.lat(), lng: e.latLng.lng()});
                    return;
                }
                if (leftUpperPoint && !rightDownPoint) {
                    setRightDownPoint({lat: e.latLng.lat(), lng: e.latLng.lng()});
                    return;
                } else {
                    setRightDownPoint(null);
                    setLeftUpperPoint(null);
                }
            }
            if (circle || insertInfoBox) {
                addMarker(e);
            }
        }, [circle, insertInfoBox, leftUpperPoint, rightDownPoint]);

        const onInfoButtonClick = useCallback(() => {
            if (!infoBox) setInfoBox(true);
            else setInfoBox(false);
        }, [infoBox]);

        const onCircleButtonClick = useCallback(() => {
            if (!circle) setCircle(true);
            else setCircle(false);
        }, [circle]);

        const onInfoInsertButtonClick = useCallback(() => {
            if (!insertInfoBox) setInsertInfoBox(true);
            else setInsertInfoBox(false);
        }, [insertInfoBox]);


        const onUserPlaceListClick = useCallback(() => {
            if (!userPlaceList) setUserPlaceList(true);
            else setUserPlaceList(false);
        }, [userPlaceList]);

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
                    //console.dir(e);
                    e.preventDefault();
                    setRadius(parseInt(e.target.value, 10));
                }
            }, [radius]
        );

        const onZoomChanged = useCallback( e => {
            console.dir(e);
        }, [zoom]);

        return (
            <Row>
                <Col>
                    <LoadScript
                        id="script-loader"
                        googleMapsApiKey="AIzaSyBoLaZLcIzTtGb0Ogg23GTiPkuXs0R-JwE"
                        >
                        <GoogleMap
                            mapContainerStyle={{
                                height: '500px',
                                width: '1500px'
                            }}
                            zoom={zoom}
                            center={initialPosition}
                            onClick={onMapClick}
                            onZoomChanged={onZoomChanged}
                            >

                            {circle && <MapCircle position={userPosition} radius={radius}/>}
                            {circle && <UserMarker position={userPosition}/>}
                            {insertInfoBox && <UserMarker position={userPosition}/>}
                            {leftUpperPoint && rightDownPoint && <RectangleContainer
                                leftUpper={leftUpperPoint} rightDown={rightDownPoint}/>}
                            {infoBox && <UserInfoOnMapContainer position={initialPosition}/>}
                        </GoogleMap>
                    </LoadScript>
                    <Button variant="outline-info" onClick={onInfoButtonClick}>유저 위치(지도)</Button>
                    <Button variant="outline-info" onClick={onInfoInsertButtonClick}>유저 위치 추가</Button>
                    <Button variant="outline-info" onClick={onUserPlaceListClick}>유저 위치(리스트)</Button>
                    <PopOverButton contentMessage="사각형을 그리기 위해 맵에서 사각형의 좌측 상단에 해당하는 부분을 클릭 후
                맵에서 사각형의 우측 하단에 해당하는 부분을 클릭해주세요"
                                   titleMessage="사각형 그리는 방법" ButtonLabel="구역 추가하기"
                                   onClick={onRectangleClick}/>

                </Col>

                <Col>
                    {marker && <MarkerInfo position={userPosition}/>}
                    {insertInfoBox && <UserInfoInsertBox position={userPosition} circle={circle}
                                                         setCircle={setCircle} onKeyPress={onKeyPress} setRadius={setRadius}
                                                            radius={radius}/>}
                    {userPlaceList && <UserPlaceContainer/>}
                    {rectangle && <h2>rectangle<GiSoccerBall/></h2>}

                </Col>
            </Row>
        );
    }
;

export default MapContainer;
