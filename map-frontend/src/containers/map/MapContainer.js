import React, {useCallback, useEffect, useState} from 'react'
import {
    GoogleMap,
    InfoWindow,
    LoadScript,
    DirectionsRenderer,
    DirectionsService,
    Polyline,
    Polygon,
    DrawingManager,
    LoadScriptNext,
} from '@react-google-maps/api'
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
import MapSearchBox from "../../components/map/MapSearchBox";

const MapContainer = ({onPopUpClick}) => {
        const dispatch = useDispatch();
        const {loading, form} = useSelector(({map, loading}) => ({
            loading: loading,
            form: map.info,
        }));

        const [drawingMode, setDrawingMode] = useState('');
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
                console.dir(leftUpperPoint);
                if (!leftUpperPoint) {
                    setLeftUpperPoint({lat: e.latLng.lat(), lng: e.latLng.lng()});
                    console.dir(leftUpperPoint);
                    return;
                }
                if (leftUpperPoint && !rightDownPoint) {
                    setRightDownPoint({lat: e.latLng.lat(), lng: e.latLng.lng()});
                    console.dir(rightDownPoint);
                    return;
                } else {
                    setRightDownPoint(null);
                    setLeftUpperPoint(null);
                }
            }
            if (circle || insertInfoBox) {
                addMarker(e);
            }
        }, [circle, insertInfoBox]);

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

        const onKeyPressForRadius = useCallback(
            e => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    setRadius(parseInt(e.target.value, 10));
                }
            }, [radius]
        );

        useEffect( () => {
            if(!drawingMode) setDrawingMode(true);
        }, [drawingMode]);

        const onCompleteRectangleInDrawingManager = useCallback(
            e => {
                console.dir(e);
                setLeftUpperPoint({lng: parseFloat(e.bounds.ka.g), lat: parseFloat(e.bounds.pa.h)});
                setRightDownPoint({lng: parseFloat(e.bounds.ka.h), lat: parseFloat(e.bounds.pa.g)});
                setDrawingMode(null);
            }, [leftUpperPoint, rightDownPoint]
        );

        return (
            <Row>
                <Col>
                    {drawingMode && <LoadScriptNext
                        id="script-loader"
                        googleMapsApiKey="AIzaSyBoLaZLcIzTtGb0Ogg23GTiPkuXs0R-JwE"
                        libraries={[`drawing`]}
                    >

                        <GoogleMap
                            mapContainerStyle={{
                                height: '500px',
                                width: '1500px'
                            }}
                            zoom={15}
                            center={initialPosition}
                            onClick={onMapClick}
                            onRightClick={onPopUpClick}
                        >

                            {drawingMode && <DrawingManager onRectangleComplete={onCompleteRectangleInDrawingManager}
                                                            drawingMode={drawingMode}/>}
                            {circle && <MapCircle position={userPosition} radius={radius}/>}
                            {insertInfoBox && <UserMarker position={userPosition} circle={circle}
                                                          setCircle={setCircle} onKeyPress={onKeyPressForRadius}
                                                          setRadius={setRadius} radius={radius}
                            />}
                            {rectangle && <RectangleContainer
                                leftUpper={leftUpperPoint} rightDown={rightDownPoint}/>}
                            {infoBox && <UserInfoOnMapContainer />}
                        </GoogleMap>
                    </LoadScriptNext>
                    }
                    <Button variant="outline-info" onClick={onInfoButtonClick}>유저 위치(지도)</Button>
                    <Button variant="outline-info" onClick={onInfoInsertButtonClick}>유저 위치 추가</Button>
                    <Button variant="outline-info" onClick={onUserPlaceListClick}>유저 위치(리스트)</Button>
                    <Button variant="outline-info" onClick={onRectangleClick}>사각형 조회</Button>
                 </Col>

                <Col>
                    {marker && <MarkerInfo position={userPosition}/>}
                    {userPlaceList && <UserPlaceContainer/>}
                    {rectangle && <h2>rectangle<GiSoccerBall/></h2>}
                    {circle && <MapCircleInfo setRadius={setRadius} onKeyPress={onKeyPressForRadius}
                                    radius={radius}/> }
                </Col>
            </Row>
        );
    }
;

export default MapContainer;
