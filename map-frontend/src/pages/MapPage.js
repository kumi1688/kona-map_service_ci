import React, {useState} from 'react'
import {GoogleMap, LoadScript} from '@react-google-maps/api'
import HeaderContainer from "../containers/common/headerContainer";
import Button from "../components/common/Button";
import MapButton from "../components/map/MapButton";
import UserMarker from "../components/map/UserMarker";

const MapPage = () => {
    const [marker, setMarker] = useState(null);
    const [position, setPosition] = useState({lat: null, lng:null});

    const onClick =() => {
        setMarker(true);
    };

    const addMarker = (e) => {
        if(marker) {
            console.dir(e);
            setPosition({lat: e.latLng.lat(), lng: e.latLng.lng()});
        }
    };

    return (
        <>
            <HeaderContainer/>
            <LoadScript
                id="script-loader"
                googleMapsApiKey="AIzaSyBoLaZLcIzTtGb0Ogg23GTiPkuXs0R-JwE">
                <GoogleMap
                    mapContainerStyle={{
                        height: '350px',
                        width: '600px'
                    }}
                    zoom={15}
                    center={{
                        lat: 37.284315,
                        lng: 127.044504
                    }}
                    onClick={addMarker}>
                    {marker && <UserMarker position={position}/>}
                </GoogleMap>
            </LoadScript>
            <MapButton onClick={onClick}>마커 추가</MapButton>
        </>
    );
};

export default MapPage;
