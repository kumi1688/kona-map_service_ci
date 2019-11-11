import React, {useCallback, useState} from 'react'
import HeaderContainer from "../containers/common/HeaderContainer";
import MapContainer from "../containers/map/MapContainer";
import 'bootstrap/dist/css/bootstrap.min.css';

const MapPage = () => {
    return (
        <>
            <HeaderContainer/>
            <MapContainer />
        </>
    );
};

export default MapPage;
