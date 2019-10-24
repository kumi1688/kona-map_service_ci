import React, {useState} from 'react'
import {GoogleMap, LoadScript} from '@react-google-maps/api'
import HeaderContainer from "../containers/common/headerContainer";
import MapContainer from "../containers/map/MapContainer";

const MapPage = () => {
    return (
        <>
            <HeaderContainer/>
            <MapContainer/>
        </>
    );

};

export default MapPage;
