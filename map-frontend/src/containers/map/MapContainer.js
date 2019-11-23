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
import styled from "styled-components";
import RoadControlContainer from "./RoadControlContainer";
import RoadModal from "../../components/map/RoadModal";
import RoadViewContainer from "./RoadViewContainer";
import RoadDropDownButton from "../../components/map/RoadDropDownButton";
import {polylineOptions} from "../../components/map/RoadColor";
import RoadRemarkContainer from "../../components/map/RoadRemarkContainer";

const StyledMapContainerWrapper = styled.div`
    position: fixed;
`;

const StyledDropDownWrapper = styled.div`
    z-index : 10;
    position: fixed;
    background-color : white;
    right: 0;
    margin : 40px 20px 40px 20px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
`;

const circleOptions = {
    fillColor: '#ffff00',
    fillOpacity: 1,
    strokeWeight: 5,
    clickable: false,
    editable: true,
    zIndex: 1
};

const getPolyLineOption = (type) => {
    switch (type) {
        case 'mainRoad' :
            return polylineOptions.mainRoad;
        case 'smallRoad' :
            return polylineOptions.smallRoad;
        case 'travelRoad' :
            return polylineOptions.travelRoad;
        case 'foodRoad' :
            return polylineOptions.foodRoad;
        case 'sightSeeingRoad' :
            return polylineOptions.sightSeeingRoad;
        default :
            return polylineOptions.mainRoad;
    }
    ;
};


const MapContainer = () => {
        const dispatch = useDispatch();
        const {
            username, searchQueryOnMap, currentUserLocation, isAddInfo, isAddRoad, roadType,
            searchQueryType, isClearMap
        } = useSelector(({map, user}) => ({
            searchQueryOnMap: map.searchQuery.searchQueryOnMap,
            searchQueryType: map.searchQuery.searchQueryType,
            currentUserLocation: map.currentUserLocaction,
            isAddInfo: map.isAddInfo,
            isAddRoad: map.isAddRoad,
            username: user.user.username,
            roadType: map.roadType,
            isClearMap: map.isClearMap
        }));

        const [temp, setTemp] = useState(null);
        const [fetchedRoadList, setFetchedRoadList] = useState(null);
        const [uploadRoadList, setUploadRoadList] = useState([]);
        const [roadList, setRoadList] = useState([]);
        const [userLocOnMap, setUserLocOnMap] = useState(null);
        const [map, setMap] = useState(null);
        const [polyLineObject, setPolyLineObject] = useState(null);
        const [zoom, setZoom] = useState(15);
        const [drawingMode, setDrawingMode] = useState(null);
        const [marker, setMarker] = useState(null);
        const [circle, setCircle] = useState(null);
        const [radius, setRadius] = useState(null);
        const [insertInfoBox, setInsertInfoBox] = useState(null);
        const [leftUpperPoint, setLeftUpperPoint] = useState(null);
        const [rightDownPoint, setRightDownPoint] = useState(null);
        const [userPlaceList, setUserPlaceList] = useState(null);
        const [userPosition, setUserPosition] = useState({lat: null, lng: null});
        const [visibleRoad, setVisibleRoad] = useState(null);
        const [isAddRoadInfo, setIsAddRoadInfo] = useState(null);


        const initialPosition = {lat: 37.284315, lng: 127.044504};

        const onMapClick = useCallback(e => {
            console.dir('클릭');
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

        const addMarker = useCallback((e) => {
            setUserPosition({lat: e.latLng.lat(), lng: e.latLng.lng()});
        }, [userPosition]);

        const onKeyPressForRadius = useCallback(
            e => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    setRadius(parseInt(e.target.value, 10));
                }
            }, [radius]);

        const onRightClick = useCallback(
            e => {
                console.dir(e);
                setDrawingMode('');
            }, [drawingMode]);

        useEffect(() => {
            if (!userLocOnMap) setUserLocOnMap(currentUserLocation);
            else setUserLocOnMap(false);
        }, [currentUserLocation]);

        useEffect(() => {
            if (isAddInfo) setInsertInfoBox(true);
            else setInsertInfoBox(false);
        }, [isAddInfo]);

        useEffect(() => {
            console.dir(zoom);
        }, [zoom]);

        useEffect(() => {
            console.dir(isAddRoad);
        }, [isAddRoad]);

        useEffect(() => {
            if (!currentUserLocation) setUserLocOnMap(true);
        }, [currentUserLocation]);

        const onCompleteRectangleInDrawingManager = useCallback(
            e => {
                setLeftUpperPoint({lng: parseFloat(e.bounds.ka.g), lat: parseFloat(e.bounds.pa.h)});
                setRightDownPoint({lng: parseFloat(e.bounds.ka.h), lat: parseFloat(e.bounds.pa.g)});
                setDrawingMode(null);
            }, [leftUpperPoint, rightDownPoint]
        );

        const getPolyLineObject = useCallback(e => {
            setPolyLineObject(e);
        }, [polyLineObject]);

        const RemovePolyLine = useCallback(e => {
            const removePolyLine = () => {
                try {
                    if (roadList) {
                        roadList.map((road, index) => (road.setMap(null)));
                    }
                } catch (e) {
                    console.dir(e);
                }
            };
            removePolyLine();
        }, [polyLineObject, roadList]);

        const getMapObject = useCallback(e => {
            setMap(e);
            //console.dir(e.getZoom());
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
            console.dir(drawingMode);
            setDrawingMode(null);
        }, [drawingMode]);

        const onPolylineComplete = useCallback(
            e => {
                console.dir(e.getPath());
                let arr = [];
                e.getPath().g.forEach(function (element) {
                    arr = arr.concat({lat: element.lat(), lng: element.lng()});
                });
                setTemp(arr);
                setRoadList(roadList.concat(arr));
            }, [drawingMode]);

        useEffect(() => {
            console.dir(temp);
        }, [temp]);

        useEffect(() => {
            console.dir(roadList);
        }, [roadList]);

        const onVisibleToggle = useCallback(
            () => {
                if (!visibleRoad) setVisibleRoad(true);
                else setVisibleRoad(false);
            }, [visibleRoad]);

        const addRoadInfo = useCallback(
            () => {
                if (!isAddRoadInfo) setIsAddRoadInfo(true);
                else setIsAddRoadInfo(false);
            }, [roadList]);

        const saveRoadList = useCallback(() => {
            console.dir(roadList);
            if (roadList) {
                setUploadRoadList(uploadRoadList.concat({
                    roadInfo: roadList,
                    username: username,
                }));
            }
        }, [roadList, uploadRoadList]);

        useEffect(() => {
            console.dir(uploadRoadList);
        }, [uploadRoadList]);

        const fetchRoad = useCallback(
            () => {
                if (!fetchedRoadList) setFetchedRoadList(true);
                else setFetchedRoadList(false);
            }, [fetchedRoadList]);


        return (
            <Row>
                {circle && <MapCircleInfo setRadius={setRadius} onKeyPress={onKeyPressForRadius}
                                          radius={radius}/>}
                {isAddRoad && <RoadDropDownButton addRoadInfo={addRoadInfo}/>}
                {searchQueryOnMap && searchQueryType === 'road' && <RoadRemarkContainer/>}

                <StyledMapContainerWrapper>
                    <Col>
                        <LoadScriptNext
                            id="script-loader"
                            googleMapsApiKey="AIzaSyBoLaZLcIzTtGb0Ogg23GTiPkuXs0R-JwE"
                            libraries={[`drawing`]}>

                            <GoogleMap
                                mapContainerStyle={{
                                    height: '550px',
                                    width: '1350px'
                                }}
                                zoom={zoom}
                                center={initialPosition}
                                onClick={onMapClick}
                                onLoad={getMapObject}
                                onZoomChanged={onZoomChanged}
                                onRightClick={onRightClick}
                                options={{
                                    zoomControl: true,
                                    panControl: true,
                                    fullscreenControl: true,
                                    gestureHandling: "cooperative",
                                }}
                            >
                                {!drawingMode && <DrawingManager onRectangleComplete={onCompleteRectangleInDrawingManager}
                                                                 drawingMode={drawingMode}
                                                                 options={{
                                                                     polylineOptions: getPolyLineOption(roadType),
                                                                     circleOptions: circleOptions
                                                                 }}
                                                                 onPolylineComplete={onPolylineComplete}
                                                                 onLoad={getPolyLineObject}
                                />}
                                {circle && <MapCircle position={userPosition} radius={radius}/>}
                                {insertInfoBox && <UserMarker position={userPosition} circle={circle}
                                                              setCircle={setCircle} onKeyPress={onKeyPressForRadius}
                                                              setRadius={setRadius} radius={radius}
                                />}

                                {searchQueryOnMap && !isClearMap && <UserInfoOnMapContainer zoom={zoom}/>}
                                {userLocOnMap && <UserMarker position={userLocOnMap} circle={-1} animation={true}/>}
                                {fetchedRoadList && <RoadViewContainer/>}
                                {visibleRoad &&
                                <RoadControlContainer uploadRoadList={uploadRoadList} roadList={roadList} map={map}/>}
                            </GoogleMap>
                        </LoadScriptNext>
                        {isAddRoadInfo && <RoadModal roadPath={roadList}/>}
                        <Button variant="outline-info" onClick={RemovePolyLine}>경로 삭제하기</Button>
                        <Button variant="outline-info" onClick={onVisibleToggle}>경로 보여주기</Button>
                        <Button variant="outline-info" onClick={onUserPlaceListClick}>유저 위치(리스트)</Button>
                        <Button variant="outline-info" onClick={fetchRoad}>경로 가져오기</Button>
                    </Col>

                    <Col>
                        {marker && <MarkerInfo position={userPosition}/>}
                        {userPlaceList && <UserPlaceContainer/>}

                    </Col>
                </StyledMapContainerWrapper>
            </Row>
        );
    }
;

export default MapContainer;
