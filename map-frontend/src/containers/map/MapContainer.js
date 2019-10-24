import React, {useState} from 'react'
import styled from "styled-components";
import {GoogleMap, LoadScript} from '@react-google-maps/api'
import MapButton from "../../components/map/MapButton";
import UserMarker from "../../components/map/UserMarker";
import Responsive from "../../components/common/Responsive";
import MarkerInfo from "../../components/map/MarkerInfo";

const MapBlock = styled.div`
      position: fixed;
      width: 100%;
    `;

const Wrapper = styled.div`
    flex: 1;
    flex-direction: row;
    .input, map{
    flex : 1;
    }
`;

const MapContainer = () => {
    const [marker, setMarker] = useState(null);
    const [position, setPosition] = useState({lat: 37.284315, lng: 127.044504});
    const [userPosition, setUserPosition] = useState({lat: null, lng: null});

    const onClick = () => {
        setMarker(true);
    };

    const addMarker = (e) => {
        setUserPosition({lat: e.latLng.lat(), lng: e.latLng.lng()});
    };

    return (
        <MapBlock>
            <Wrapper>
                <LoadScript
                    id="script-loader"
                    googleMapsApiKey="AIzaSyBoLaZLcIzTtGb0Ogg23GTiPkuXs0R-JwE">
                    <GoogleMap
                        mapContainerStyle={{
                            height: '350px',
                            width: '600px'
                        }}
                        zoom={15}
                        center={position}
                        onClick={addMarker}>
                        {marker && <UserMarker position={userPosition}/>}
                    </GoogleMap>
                </LoadScript>
                <MapButton onClick={onClick}>마커 추가</MapButton>
                {marker &&  <MarkerInfo position={userPosition}/>}
            </Wrapper>
        </MapBlock>
    );
};

export default MapContainer;
