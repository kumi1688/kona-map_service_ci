import React, {useCallback, useEffect, useState} from 'react'
import {
    GoogleMap,
    InfoWindow,
    LoadScript,
    DirectionsRenderer,
    DirectionsService,
    Polyline,
    Polygon,
    Marker,
    DrawingManager,
    MarkerClusterer,
    LoadScriptNext,
    OverlayView,
    GroundOverlay
} from '@react-google-maps/api'
import {Row, Col, Button, Container, Image} from 'react-bootstrap';
import UserMarker from "../../components/map/UserMarker";
import MarkerInfo from "../../components/map/MarkerInfo";
import MapCircle, {MapCircleInfo} from "../../components/map/MapCircle";
import UserPlaceContainer from "./UserPlaceContainer";
import {useSelector, useDispatch} from "react-redux";
import RectangleContainer from "./RectangleContainer";
import UserInfoOnMapContainer from "./UserInfoOnMapContainer";
import {GiSoccerBall} from 'react-icons/gi';
import ClusterMarkerContainer from "./ClusterMarkerContainer";
import AlertComponent from "../../components/common/AlertComponent";

const MapContainer = ({onPopUpClick}) => {
        const dispatch = useDispatch();
        const {searchQueryOnMap, currentUserLocation} = useSelector(({map}) => ({
            searchQueryOnMap: map.searchQuery.searchQueryOnMap,
            currentUserLocation: map.currentUserLocaction
        }));

        const [userLocOnMap, setUserLocOnMap] = useState(null);
        const [map, setMap] = useState(null);
        const [zoom, setZoom] = useState(15);
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

        const onCircleButtonClick = useCallback(() => {
            if (!circle) setCircle(true);
            else setCircle(false);
        }, [circle]);

        const onInfoInsertButtonClick = useCallback((e) => {
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

        const onDblClick = useCallback(e => {
            console.dir(e);
        }, []);

        const onRightClick = useCallback(e => {
            console.dir(e);
        }, []);

        const onUserLocationClick = useCallback(
            () => {
                if (!userLocOnMap) setUserLocOnMap(true);
                else setUserLocOnMap(false);
            }, [currentUserLocation]);

        useEffect(() => {
            if (!drawingMode) setDrawingMode(true);
        }, [drawingMode]);

        useEffect(() => {
            console.dir(zoom);
        }, [zoom]);

        const onCompleteRectangleInDrawingManager = useCallback(
            e => {
                setLeftUpperPoint({lng: parseFloat(e.bounds.ka.g), lat: parseFloat(e.bounds.pa.h)});
                setRightDownPoint({lng: parseFloat(e.bounds.ka.h), lat: parseFloat(e.bounds.pa.g)});
                setDrawingMode(null);
            }, [leftUpperPoint, rightDownPoint]
        );

        const getMapObject = useCallback(e => {
            setMap(e);
            console.dir(e.getZoom());
        }, [map]);

        const onZoomChanged = useCallback(e => {
            const fetchZoom = async () => {
                try {
                    const response = await map.getZoom();
                    setZoom(response);
                } catch (e) {
                    console.dir(e);
                }
            };
            fetchZoom();
        }, [map]);

        useEffect(() => {
            console.dir(currentUserLocation);
        }, [currentUserLocation]);

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
                                width: '1350px'
                            }}
                            zoom={zoom}
                            center={initialPosition}
                            onClick={onMapClick}
                            onRightClick={onPopUpClick}
                            onDblClick={onDblClick}
                            onLoad={getMapObject}
                            onZoomChanged={onZoomChanged}
                            options={{
                                zoomControl: true,
                                panControl: true,
                                fullscreenControl: true,
                                gestureHandling: "cooperative"
                            }}
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
                            {searchQueryOnMap && <UserInfoOnMapContainer zoom={zoom}/>}
                            {userLocOnMap && <UserMarker position={currentUserLocation} circle={-1}/>}

                        </GoogleMap>
                    </LoadScriptNext>
                    }
                    <Button vraiant="outline-info" onClick={onUserLocationClick}>현재 내 위치 찾기</Button>
                    <Button variant="outline-info" onClick={onInfoInsertButtonClick}>유저 위치 추가</Button>
                    <Button variant="outline-info" onClick={onUserPlaceListClick}>유저 위치(리스트)</Button>
                    <Button variant="outline-info" onClick={onRectangleClick}>사각형 조회</Button>
                </Col>

                <Col>
                    {marker && <MarkerInfo position={userPosition}/>}
                    {userPlaceList && <UserPlaceContainer/>}
                    {rectangle && <h2>rectangle<GiSoccerBall/></h2>}
                    {circle && <MapCircleInfo setRadius={setRadius} onKeyPress={onKeyPressForRadius}
                                              radius={radius}/>}
                </Col>
            </Row>
        );
    }
;

export default MapContainer;

//{searchQueryOnMap && zoom <= 13 && <ClusterMarkerContainer zoom={zoom}/> }
