import React, {useCallback, useState} from 'react'
import {GoogleMap, LoadScript, DrawingManager, InfoWindow} from '@react-google-maps/api'
import {Row, Col, Button} from 'react-bootstrap';
import UserMarker from "../../components/map/UserMarker";
import MarkerInfo from "../../components/map/MarkerInfo";
import MapCircle, {MapCircleInfo} from "../../components/map/MapCircle";
import MapPage from "../../pages/MapPage";


const MapContainer = () => {
    const [marker, setMarker] = useState(null);
    const [circle, setCircle] = useState(null);
    const [radius, setRadius] = useState(null);
    const initialPosition = {lat:37.284315, lng: 127.044504};
    const [userPosition, setUserPosition] = useState({lat: null, lng: null});

    const onMarkerButtonClick = () => {
        if(!marker) setMarker(true);
        else setMarker(false);
    };

    const onCircleButtonClick = () => {
        if(!circle) setCircle(true);
        else setCircle(false);
    };

    const addMarker = (e) => {
        setUserPosition({lat: e.latLng.lat(), lng: e.latLng.lng()});
    };

    const onKeyPress = useCallback(
        e=> {
            if( e.key === 'Enter'){
                    e.preventDefault();
                    setRadius(parseInt(e.target.value, 10));
            }
        } , [radius]
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
                        onClick={addMarker}>
                        {marker && <UserMarker position={userPosition}/>}
                        {circle && <MapCircle position={userPosition} radius={radius}/>}
                    </GoogleMap>
                </LoadScript>
                <Button variant="outline-info" onClick={onMarkerButtonClick}>마커 추가</Button>
                <Button variant="outline-info" onClick={onCircleButtonClick} >일정 범위 조회</Button>
            </Col>

            <Col>
                {marker && <MarkerInfo position={userPosition}/>}
                {circle && <MapCircleInfo position={userPosition} onKeyPress={onKeyPress}/>}
            </Col>

        </Row>
    );
};

export default MapContainer;
